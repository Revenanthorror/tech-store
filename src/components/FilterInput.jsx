import { useState, useEffect } from 'react';
import './FilterInput.css';

export default function FilterInput({ onFilter }) {
  const [selectedGenre, setSelectedGenre] = useState('');

  const genreOptions = ['Все', 'Драма', 'Комедия', 'Боевик', 'Ужасы', 'Фантастика'];

  const handleGenreChange = (e) => {
    const value = e.target.value;
    setSelectedGenre(value);
  };

  useEffect(() => {
    const handler = setTimeout(() => {
      onFilter(selectedGenre);
    }, 300);

    return () => {
      clearTimeout(handler);
    };
  }, [selectedGenre, onFilter]);

  return (
    <div className="filter-container">
      <select
        value={selectedGenre}
        onChange={handleGenreChange}
        className="filter-select"
      >
        {genreOptions.map((genre, index) => (
          <option key={index} value={genre}>
            {genre}
          </option>
        ))}
      </select>
    </div>
  );
}