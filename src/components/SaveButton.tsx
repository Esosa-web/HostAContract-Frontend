// src/components/SaveButton.tsx

import React from 'react';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';

// A simple SVG star component to keep things clean
const StarIcon = ({ isFilled }: { isFilled: boolean }) => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill={isFilled ? "currentColor" : "none"} stroke="currentColor" strokeWidth="2" className="w-6 h-6">
    <path strokeLinecap="round" strokeLinejoin="round" d="M11.48 3.499a.562.562 0 011.04 0l2.125 5.111a.563.563 0 00.475.321h5.364a.562.562 0 01.321.988l-4.34 3.158a.563.563 0 00-.182.635l1.644 5.051a.563.563 0 01-.812.622l-4.34-3.158a.563.563 0 00-.652 0l-4.34 3.158a.563.563 0 01-.812-.622l1.644-5.051a.563.563 0 00-.182-.635l-4.34-3.158a.562.562 0 01.321-.988h5.364a.563.563 0 00.475-.321l2.125-5.111z" />
  </svg>
);

// Define the new, simpler props
interface SaveButtonProps {
  isSaved: boolean;     // Is the item currently saved?
  isLoading: boolean;   // Is an API call in progress?
  onClick: () => void;  // The function to call when clicked.
}

const SaveButton: React.FC<SaveButtonProps> = ({ isSaved, isLoading, onClick }) => {
  const { isAuthenticated } = useAuth();
  const navigate = useNavigate();

  const handleClick = () => {
    // If not logged in, redirect to the login page.
    if (!isAuthenticated) {
      navigate('/login?next=' + window.location.pathname);
      return;
    }
    // Otherwise, call the parent's logic.
    onClick();
  };

  const buttonClass = isAuthenticated
    ? "p-2 rounded-full text-yellow-500 hover:bg-yellow-100 dark:hover:bg-gray-700 transition-colors"
    : "p-2 rounded-full text-gray-400 hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors";

  const title = isAuthenticated
    ? (isSaved ? 'Remove from Favourites' : 'Add to Favourites')
    : "Login to save";

  return (
    <button
      onClick={handleClick}
      disabled={isLoading}
      className={`${buttonClass} disabled:opacity-50`}
      title={title}
    >
      <StarIcon isFilled={isAuthenticated ? isSaved : false} />
    </button>
  );
};

export default SaveButton;