import React from 'react';
import { useNavigate } from 'react-router-dom';

const NotFound = () => {
    const navigate = useNavigate();

    const handleGoHome = () => {
        navigate('/');
    };

    return (
        <div className="flex justify-center items-center min-h-screen bg-gray-100">
            <div className="text-center">
                <h1 className="text-4xl font-bold text-red-500">404 - Page Not Found</h1>
                <p className="text-lg mt-4 text-gray-700">Sorry, the page you are looking for does not exist.</p>
                <button
                    onClick={handleGoHome}
                    className="mt-6 px-4 py-2 bg-sky-500 text-white rounded-lg hover:bg-blue transition"
                >
                    Back to Home
                </button>
            </div>
        </div>
    );
};

export default NotFound;
