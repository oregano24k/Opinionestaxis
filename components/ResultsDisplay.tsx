import React from 'react';
import { SearchResult } from '../types';
import SourceLink from './SourceLink';

interface ResultsDisplayProps {
    result: SearchResult;
}

const ResultsDisplay: React.FC<ResultsDisplayProps> = ({ result }) => {
    // Split the text into paragraphs for better readability
    const paragraphs = result.text.split('\n').filter(p => p.trim() !== '');

    return (
        <div className="w-full max-w-4xl p-6 mt-8 bg-white border border-gray-200 rounded-lg shadow-lg animate-fade-in">
            <h2 className="mb-4 text-2xl font-bold text-cyan-600">Resultados de la Búsqueda</h2>
            <div className="space-y-4 text-gray-700 prose max-w-none">
                {paragraphs.map((p, index) => (
                    <p key={index}>{p}</p>
                ))}
            </div>

            {result.sources && result.sources.length > 0 && (
                <div className="mt-8">
                    <h3 className="text-xl font-semibold text-gray-800 border-b-2 border-gray-300 pb-2 mb-4">Fuentes</h3>
                    <div className="grid grid-cols-1 gap-2 md:grid-cols-2">
                        {result.sources.map((source, index) => (
                            <SourceLink key={index} source={source} />
                        ))}
                    </div>
                </div>
            )}
        </div>
    );
};

export default ResultsDisplay;