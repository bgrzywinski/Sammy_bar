'use client';

import { useState } from 'react';
import SearchBar from '../components/SearchBar';
import LoadingAnimation from '../components/LoadingAnimation';
import SearchResults from '../components/SearchResults';

export default function Home() {
  const [isLoading, setIsLoading] = useState(false);
  const [results, setResults] = useState(null);
  const [error, setError] = useState(null);

  const handleSearch = async (query) => {
    setIsLoading(true);
    setError(null);
    setResults(null);

    try {
      const response = await fetch('/api/search', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ query }),
      });

      if (!response.ok) {
        throw new Error('Wystąpił problem z wyszukiwaniem');
      }

      const data = await response.json();
      setResults(data);
    } catch (err) {
      setError(err.message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <main className="min-h-screen bg-gradient-to-b from-blue-50 to-white py-12 px-4">
      <div className="container mx-auto">
        <div className="text-center mb-12">
          <h1 className="text-5xl font-bold text-blue-600 mb-4">Sammy</h1>
          <p className="text-xl text-gray-600">Twoja wyszukiwarka streszczeń i recenzji</p>
        </div>

        <SearchBar onSearch={handleSearch} isLoading={isLoading} />

        {isLoading && <LoadingAnimation />}

        {error && (
          <div className="text-center mt-8 p-4 bg-red-100 text-red-700 rounded-lg">
            {error}
          </div>
        )}

        {results && <SearchResults results={results} />}
      </div>
    </main>
  );
}