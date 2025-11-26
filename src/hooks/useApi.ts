// src/hooks/useApi.ts

import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import { useCallback } from 'react';

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || '';

export const useApi = () => {
    const { token, logout } = useAuth();
    const navigate = useNavigate();

    const apiFetch = useCallback(async (url: string, options: RequestInit = {}) => {
        const headers = new Headers(options.headers || {});
        if (token) {
            headers.set('Authorization', `Token ${token}`);
        }
        if (!headers.has('Content-Type') && options.body) {
            headers.set('Content-Type', 'application/json');
        }

        // <<< --- START: NEW, SAFER TRAILING SLASH LOGIC --- >>>
        let finalUrl = url;

        // The search endpoint is the main one we know needs a slash.
        // We will only apply the auto-slash logic to it specifically.
        if (finalUrl.startsWith('/api/search')) {
            const queryStringIndex = finalUrl.indexOf('?');
            let pathPart = queryStringIndex === -1 ? finalUrl : finalUrl.substring(0, queryStringIndex);
            const queryStringPart = queryStringIndex === -1 ? '' : finalUrl.substring(queryStringIndex);

            if (!pathPart.endsWith('/')) {
                pathPart += '/';
            }
            finalUrl = pathPart + queryStringPart;
        }
        // For all other URLs (like /api/auth/registration/), we will trust them to be correct.
        // This prevents our hook from breaking library-defined URLs.
        
        const fullUrl = `${API_BASE_URL}${finalUrl}`;
        // <<< --- END: NEW, SAFER TRAILING SLASH LOGIC --- >>>


        const response = await fetch(fullUrl, { ...options, headers, credentials: 'include' });

        if (response.status === 204) return null;

        const data = await response.json();

        if (!response.ok) {
            if (data && data.error_code === 'LIMIT_EXCEEDED' && data.redirect_url) {
                navigate(data.redirect_url);
            }
            const error = new Error(data?.detail || 'An API error occurred.');
            (error as any).response = response;
            (error as any).data = data;
            throw error;
        }
        return data;

    }, [token, navigate, logout]);

// <<< --- START: ADD THE NEW "UNTRACKED" FETCHER --- >>>
    // This is a lightweight version for background tasks like the live count.
    const apiFetchUntracked = useCallback(async (url: string, options: RequestInit = {}) => {
        const headers = new Headers(options.headers || {});
        // It still needs the token to ensure the user is authenticated.
        if (token) {
            headers.set('Authorization', `Token ${token}`);
        }
        if (!headers.has('Content-Type') && options.body) {
            headers.set('Content-Type', 'application/json');
        }

        const fullUrl = `${API_BASE_URL}${url}`;
        const response = await fetch(fullUrl, { ...options, headers, credentials: 'include' });

        // NOTE: It does NOT have the special 204 or error_code handling.
        // It's a simpler fetcher for a simpler task.
        if (!response.ok) {
            const error = new Error('An untracked API error occurred.');
            (error as any).response = response;
            throw error;
        }
        return response.json();

    }, [token]); // It only depends on the token.
    // <<< --- END: ADD THE NEW "UNTRACKED" FETCHER --- >>>

    return { apiFetch, apiFetchUntracked };
};