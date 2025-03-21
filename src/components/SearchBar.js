'use client';

import { useState } from 'react';

const SearchBar = ({ onSearch, isLoading }) => {
  const [query, setQuery] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (query.trim() && !isLoading) {
      onSearch(query);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="w-full max-w-2xl mx-auto">
      <div className="relative flex items-center">
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Wyszukaj książkę, film lub artykuł..."
          className="w-full p-4 pr-12 text-lg rounded-full border-2 border-blue-300 focus:border-blue-500 focus:outline-none shadow-lg"
          disabled={isLoading}
        />
        <button
          type="submit"
          className="absolute right-3 p-2 text-white bg-blue-500 rounded-full hover:bg-blue-600 disabled:bg-blue-300"
          disabled={isLoading}
        >
          Szukaj
        </button>
      </div>
    </form>
  );
};

export default SearchBar;