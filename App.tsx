import React, { useState, useCallback } from 'react';
import { SearchResult } from './types';
import { searchCompanyInfo } from './services/geminiService';
import SearchInput from './components/SearchInput';
import LoadingSpinner from './components/LoadingSpinner';
import ErrorMessage from './components/ErrorMessage';
import ResultsDisplay from './components/ResultsDisplay';

const App: React.FC = () => {
    const [searchResult, setSearchResult] = useState<SearchResult | null>(null);
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [error, setError] = useState<string | null>(null);

    const handleSearch = useCallback(async (company: string, period: string) => {
        setIsLoading(true);
        setError(null);
        setSearchResult(null);

        try {
            const result = await searchCompanyInfo(company, period);
            setSearchResult(result);
        } catch (err: unknown) {
            if (err instanceof Error) {
                setError(err.message);
            } else {
                setError("Ocurrió un error inesperado.");
            }
        } finally {
            setIsLoading(false);
        }
    }, []);

    const WelcomeMessage: React.FC = () => (
        <div className="p-8 mt-8 text-center bg-gray-50 border border-gray-200 rounded-lg max-w-2xl">
             <i className="fas fa-car-side text-4xl text-cyan-500 mb-4"></i>
            <h2 className="text-2xl font-bold text-gray-900">Bienvenido al Buscador de Empresas</h2>
            <p className="mt-2 text-gray-600">
                Seleccione una compañía y opcionalmente un período de tiempo para buscar información actualizada sobre ella
                <span className="font-bold text-cyan-600"> en la República Dominicana</span>.
            </p>
        </div>
    );


    return (
        <div className="min-h-screen bg-white text-gray-800 flex flex-col items-center p-4 sm:p-8 font-sans">
            <header className="text-center mb-8">
                <h1 className="text-4xl sm:text-5xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-cyan-600 to-blue-700">
                    Análisis de Empresas IA
                </h1>
                <p className="mt-2 text-lg text-gray-600">
                    Encuentra información sobre <span className="font-semibold text-gray-900">Uber, Didi e inDrive en República Dominicana</span>
                </p>
            </header>

            <main className="w-full flex flex-col items-center">
                <SearchInput onSearch={handleSearch} isLoading={isLoading} />
                
                <div className="w-full mt-6">
                    {isLoading && <LoadingSpinner />}
                    {error && <ErrorMessage message={error} />}
                    {searchResult && <ResultsDisplay result={searchResult} />}
                    {!isLoading && !error && !searchResult && <WelcomeMessage />}
                </div>
            </main>
        </div>
    );
};

export default App;