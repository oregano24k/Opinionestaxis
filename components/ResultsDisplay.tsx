import React from 'react';
import { SearchResult } from '../types';
import SourceLink from './SourceLink';

interface ResultsDisplayProps {
    result: SearchResult;
}

const KeyDataItem: React.FC<{ item: string }> = ({ item }) => {
    const getIcon = (text: string): string => {
        const lowerText = text.toLowerCase();
        if (/\d/.test(lowerText) || lowerText.includes('%')) {
            return 'fa-chart-pie'; // Icon for numbers, stats
        }
        if (lowerText.includes('fecha') || lowerText.includes('hoy') || lowerText.includes('semana') || lowerText.includes('mes')) {
            return 'fa-calendar-alt'; // Icon for dates
        }
        return 'fa-info-circle'; // Generic info icon
    };
    
    // Remove markdown list characters like '*' or '-'
    const cleanedItem = item.replace(/^[\*\-]\s*/, '');

    return (
        <li className="flex items-start p-3 bg-cyan-50/50 border border-cyan-100 rounded-lg">
            <i className={`fas ${getIcon(item)} text-cyan-500 text-lg mr-4 mt-1`}></i>
            <span className="text-gray-800">{cleanedItem}</span>
        </li>
    );
};


const ResultsDisplay: React.FC<ResultsDisplayProps> = ({ result }) => {
    const KEY_DATA_HEADING = '## Datos Clave';
    let summary = result.text;
    let keyData: string[] = [];

    if (result.text.includes(KEY_DATA_HEADING)) {
        const parts = result.text.split(KEY_DATA_HEADING);
        summary = parts[0];
        // Parse list items from the second part
        keyData = parts[1].split('\n').filter(line => line.trim().startsWith('*') || line.trim().startsWith('-'));
    }
    
    const summaryParagraphs = summary.split('\n').filter(p => p.trim() !== '');

    return (
        <div className="w-full max-w-4xl p-6 mt-8 bg-white border border-gray-200 rounded-lg shadow-lg animate-fade-in">
            <h2 className="mb-4 text-2xl font-bold text-cyan-600">Resultados de la Búsqueda</h2>
            
            <div className="space-y-4 text-gray-700 prose max-w-none">
                {summaryParagraphs.map((p, index) => (
                    <p key={index}>{p}</p>
                ))}
            </div>

            {keyData.length > 0 && (
                 <div className="mt-8">
                    <h3 className="text-xl font-semibold text-gray-800 border-b-2 border-gray-300 pb-2 mb-4">Datos Clave</h3>
                    <ul className="space-y-3">
                        {keyData.map((item, index) => (
                           <KeyDataItem key={index} item={item} />
                        ))}
                    </ul>
                </div>
            )}

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