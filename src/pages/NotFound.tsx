import React from 'react';
import { FaExclamationTriangle } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';

const NotFound: React.FC = () => {
  const navigate = useNavigate();

  const handleGoHome = () => {
    navigate('/');
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-white text-center px-6">
      <FaExclamationTriangle className="text-primary text-6xl mb-6" />
      <h1 className="text-5xl font-bold text-gray-800 mb-4">404</h1>
      <p className="text-xl text-gray-600 mb-6">
        Oops! The page you're looking for doesn't exist.
      </p>
      <button
        onClick={handleGoHome}
        className="bg-primary hover:bg-primary/90 cursor-pointer text-white font-semibold px-6 py-3 rounded transition-colors duration-300"
      >
        Go Home
      </button>
    </div>
  );
};

export default NotFound;
