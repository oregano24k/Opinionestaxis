import React from 'react';

const LoadingSpinner: React.FC = () => {
    return (
        <div className="flex flex-col items-center justify-center p-8">
            <div className="w-16 h-16 border-4 border-dashed rounded-full animate-spin border-cyan-500"></div>
            <p className="mt-4 text-lg text-cyan-600">Buscando información...</p>
        </div>
    );
};

export default LoadingSpinner;