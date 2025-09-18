import React, { useState } from 'react';

interface SearchInputProps {
    onSearch: (company: string, period: string) => void;
    isLoading: boolean;
}

const SearchInput: React.FC<SearchInputProps> = ({ onSearch, isLoading }) => {
    const [company, setCompany] = useState<string>('Uber');
    const [period, setPeriod] = useState<string>('any');

    const handleSearch = (e: React.FormEvent) => {
        e.preventDefault();
        if (company.trim()) {
            onSearch(company.trim(), period);
        }
    };

    return (
        <form onSubmit={handleSearch} className="w-full max-w-xl grid grid-cols-1 sm:grid-cols-5 gap-4 items-center">
            <div className="relative sm:col-span-2">
                <i className="fas fa-car absolute left-4 top-1/2 -translate-y-1/2 text-gray-500"></i>
                <select
                    value={company}
                    onChange={(e) => setCompany(e.target.value)}
                    className="w-full py-3 pl-12 pr-4 text-gray-900 bg-white border-2 border-gray-300 rounded-full focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:border-cyan-500 appearance-none"
                    disabled={isLoading}
                    aria-label="Compañía"
                >
                    <option value="Uber">Uber</option>
                    <option value="Didi">Didi</option>
                    <option value="inDrive">inDrive</option>
                </select>
            </div>
             <div className="relative sm:col-span-2">
                 <i className="fas fa-calendar-alt absolute left-4 top-1/2 -translate-y-1/2 text-gray-500"></i>
                <select
                    value={period}
                    onChange={(e) => setPeriod(e.target.value)}
                    className="w-full py-3 pl-12 pr-4 text-gray-800 bg-white border-2 border-gray-300 rounded-full focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:border-cyan-500 disabled:opacity-50 appearance-none"
                    disabled={isLoading}
                    aria-label="Período de tiempo"
                >
                    <option value="any">Cualquier fecha</option>
                    <option value="today">Hoy</option>
                    <option value="week">Esta semana</option>
                    <option value="month">Este mes</option>
                </select>
            </div>
            <button
                type="submit"
                disabled={isLoading || !company.trim()}
                className="w-full sm:col-span-1 px-6 py-3 font-bold text-white transition-all duration-300 rounded-full bg-cyan-600 hover:bg-cyan-500 disabled:bg-gray-400 disabled:cursor-not-allowed disabled:opacity-50 flex items-center justify-center"
            >
                {isLoading ? (
                    <i className="fas fa-spinner animate-spin"></i>
                ) : (
                    <>
                        <i className="fas fa-search sm:mr-2"></i>
                        <span className="hidden sm:inline">Buscar</span>
                    </>
                )}
            </button>
        </form>
    );
};

export default SearchInput;