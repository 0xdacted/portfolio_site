import React, { useState, useEffect } from 'react';
import Header from '../components/general/Header';
import { MovieAttributes } from '../types/MovieAttributes';
import MovieCard from '../components/movie_page/MovieCard';
import axios from 'axios';

const Movies: React.FC = () => {
  const [movies, setMovies] = useState<MovieAttributes[]>([]);

  useEffect(() => {
    async function fetchMovies() {
      try {
        const response = await axios.get<MovieAttributes[]>(
          `http://localhost:3001/movies`,
        );
        setMovies(response.data);
      } catch (error) {
        console.error(error);
      }
    }
    fetchMovies();
  }, []);
  return (
    <div className="container">
      <Header />
      <h1 className="text-center text-3xl" style={{ marginTop: `24px` }}>
        Movies I Love
      </h1>
      <div
        className="grid grid-cols-6 grid-rows-2 gap-4"
        style={{ marginTop: `16px` }}
      >
        {movies.map((movie) => {
          return (
            <MovieCard
              key={movie.movie_uid}
              moviePageUrl={`${movie.movie_uid}`}
              directorName={movie.director.director_name}
              title={movie.movie_title}
              imageUrl={movie.movie_poster}
              originCountry={movie.country_of_origin}
            />
          );
        })}
      </div>
    </div>
  );
};

export default Movies;