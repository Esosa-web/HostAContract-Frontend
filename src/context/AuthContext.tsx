import React, { createContext, useContext, useState, ReactNode, useCallback, useMemo, useEffect } from 'react';
import { AuthenticatedUser, AuthState, AuthContextType } from '../types';

// --- MOCK USER DATA ---
const MOCK_USER: AuthenticatedUser = {
    id: 999,
    email: 'demo@winacontract.com',
    username: 'demo_user',
    first_name: 'Demo',
    last_name: 'User',
    tier: 'professional', // We give them the best tier for the demo
    date_joined: new Date().toISOString(),
    subscription_status: 'active',
    is_staff: true, // Unlock raw data views
};

const initialAuthState: AuthState = {
    isAuthenticated: false,
    user: null,
    token: null,
    isLoading: false, // No loading needed for mock
    error: null,
};

const AuthContext = createContext<AuthContextType>({
    ...initialAuthState,
    login: async () => { },
    register: async () => { },
    logout: () => { },
    setApiError: () => { },
    refreshUserStatus: async () => { },
});

export const useAuth = () => {
    const context = useContext(AuthContext);
    if (context === undefined) {
        throw new Error('useAuth must be used within an AuthProvider');
    }
    return context;
};

export const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
    // Initialize state from localStorage if available, so refresh works
    const [authState, setAuthState] = useState<AuthState>(() => {
        const storedToken = localStorage.getItem('mockToken');
        return {
            isAuthenticated: !!storedToken,
            user: storedToken ? MOCK_USER : null,
            token: storedToken,
            isLoading: false,
            error: null
        };
    });

    const setApiError = useCallback((message: string | null) => {
        setAuthState(prev => ({ ...prev, error: message }));
    }, []);

    // --- MOCK LOGIN FUNCTION ---
    const login = useCallback(async (email_: string, password_: string) => {
        console.log("MOCK LOGIN: Skipping backend check.");
        
        // Simulate network delay for realism (optional)
        setAuthState(prev => ({ ...prev, isLoading: true }));
        await new Promise(resolve => setTimeout(resolve, 800)); 

        // Always succeed
        localStorage.setItem('mockToken', 'demo-token-123');
        setAuthState({
            isAuthenticated: true,
            user: MOCK_USER,
            token: 'demo-token-123',
            isLoading: false,
            error: null,
        });
    }, []);

    // --- MOCK REGISTER FUNCTION ---
    const register = useCallback(async () => {
        console.log("MOCK REGISTER: Skipping backend check.");
        setAuthState(prev => ({ ...prev, isLoading: true }));
        await new Promise(resolve => setTimeout(resolve, 800));

        localStorage.setItem('mockToken', 'demo-token-123');
        setAuthState({
            isAuthenticated: true,
            user: MOCK_USER,
            token: 'demo-token-123',
            isLoading: false,
            error: null,
        });
    }, []);

    const logout = useCallback(async () => {
        localStorage.removeItem('mockToken');
        setAuthState(initialAuthState);
    }, []);

    const refreshUserStatus = useCallback(async () => {
        // No-op for mock mode
        console.log("Mock refresh: User is still good.");
    }, []);

    const contextValue = useMemo(() => ({
        ...authState,
        login,
        register,
        logout,
        setApiError,
        refreshUserStatus,
    }), [authState, login, register, logout, setApiError, refreshUserStatus]);

    return (
        <AuthContext.Provider value={contextValue}>
            {children}
        </AuthContext.Provider>
    );
};