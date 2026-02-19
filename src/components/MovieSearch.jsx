import { useState, useEffect, useRef } from 'react';
import './MovieSearch.css';
import SearchInput from './SearchInput';
import FilterInput from './FilterInput';

export default function MovieSearch() {
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [isSearchingById, setIsSearchingById] = useState(false);
  const [selectedGenre, setSelectedGenre] = useState('');
  const [isSearchCompleted, setIsSearchCompleted] = useState(false);
  
  const API_KEY = 'dbf38ec4-8585-431b-a36e-e89ae9e06551';
  const BASE_URL = 'https://kinopoiskapiunofficial.tech/api/v2.2/films';

  const abortControllerRef = useRef(null);
  const debounceTimeoutRef = useRef(null);

  useEffect(() => {
    if (isSearchCompleted && !searchTerm) {
      return;
    }

    if (debounceTimeoutRef.current) {
      clearTimeout(debounceTimeoutRef.current);
    }
    
    if (abortControllerRef.current) {
      abortControllerRef.current.abort();
    }
    debounceTimeoutRef.current = setTimeout(() => {
      const fetchMovies = async () => {
        try {
          const abortController = new AbortController();
          abortControllerRef.current = abortController;
          
          setLoading(true);
          let url = BASE_URL;
          
          if (!searchTerm) {
            setMovies([]);
            setLoading(false);
            setIsSearchCompleted(false);
            return;
          }
          
          if (isSearchingById && searchTerm) {
            url = `${BASE_URL}/${searchTerm}`;
          } else {
            const params = [];
            if (searchTerm) params.push(`search=${encodeURIComponent(searchTerm)}`);
            if (selectedGenre && selectedGenre !== 'Все') params.push(`genre=${encodeURIComponent(selectedGenre)}`);
            
            if (params.length > 0) {
              url += `?${params.join('&')}`;
            }
          }
          
          const response = await fetch(url, {
            signal: abortController.signal,
            headers: {
              'X-API-KEY': API_KEY,
              'accept': 'application/json'
            }
          });
          
          if (!response.ok) {
            throw new Error(`Ошибка ${response.status}: ${response.statusText}`);
          }
          
          const data = await response.json();
          
          if (isSearchingById) {
            setMovies(data ? [data] : []);
          } else {
            setMovies(data.films || []);
          }
          
          setIsSearchCompleted(true);
        } catch (err) {
          if (err.name !== 'AbortError') {
            setError(err.message);
          }
        } finally {
          setLoading(false);
        }
      };

      fetchMovies();
    }, 300);

    return () => {
      clearTimeout(debounceTimeoutRef.current);
      if (abortControllerRef.current) {
        abortControllerRef.current.abort();
      }
    };
  }, [searchTerm, isSearchingById, selectedGenre]);

  const handleResetSearch = () => {
    setSearchTerm('');
    setIsSearchCompleted(false);
    setMovies([]);
    setError(null);
  };

  const handleSearch = (term, isNumeric) => {
    setSearchTerm(term);
    setIsSearchingById(isNumeric);
  };

  const handleGenreChange = (genre) => {
    setSelectedGenre(genre);
  };

  if (loading && searchTerm) {
    return <div className="loading">Поиск фильмов...</div>;
  }

  if (error) {
    return <div className="error">Ошибка: {error}</div>;
  }

  return (
    <div className="movies-container">
      <h2>Поиск фильмов</h2>
      
      <div className="search-filters">
        <SearchInput onSearch={handleSearch} />
        <FilterInput onFilter={handleGenreChange} />
        {isSearchCompleted && (
          <button onClick={handleResetSearch} className="reset-button">
            Новый поиск
          </button>
        )}
      </div>
      
      <div className="movies-grid">
        {movies.map(movie => (
          <div key={movie.kinopoiskId} className="movie-card">
            <img 
            src={movie.posterUrl || movie.posterUrlPreview || 'https://via.placeholder.com/300x400'} 
            alt={movie.nameRu || movie.nameEn || 'Фильм'} 
            className="movie-poster" 
            />
            <h3 className="movie-name">{movie.nameRu || movie.nameEn}</h3>
            <p className="movie-year">Год: {movie.year || 'Не указан'}</p>
            <p className="movie-rating">Рейтинг: {movie.ratingKinopoisk || 'Нет рейтинга'}</p>
          </div>
        ))}
      </div>
    </div>
  );
}