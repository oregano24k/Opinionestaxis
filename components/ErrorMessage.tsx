import React from 'react';

interface ErrorMessageProps {
    message: string;
}

const ErrorMessage: React.FC<ErrorMessageProps> = ({ message }) => {
    return (
        <div className="w-full max-w-2xl p-4 mt-6 text-center bg-red-100 border border-red-300 rounded-lg">
            <p className="text-lg font-semibold text-red-800">¡Error!</p>
            <p className="text-red-700">{message}</p>
        </div>
    );
};

export default ErrorMessage;