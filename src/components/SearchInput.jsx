import { useState, useEffect } from 'react';
import './SearchInput.css';

export default function SearchInput({ onSearch }) {
  const [searchTerm, setSearchTerm] = useState('');
  
  useEffect(() => {
    const handler = setTimeout(() => {
      const isNumeric = /^\d+$/.test(searchTerm);
      onSearch(searchTerm, isNumeric);
    }, 300);

    return () => {
      clearTimeout(handler);
    };
  }, [searchTerm, onSearch]);

  return (
    <div className="search-container">
      <input
        type="text"
        placeholder="Поиск по фильмам или ID..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        className="search-input"
      />
    </div>
  );
}