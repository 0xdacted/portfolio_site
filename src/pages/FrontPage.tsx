import React, { useState, useEffect } from 'react';
import Header from '../components/general/Header';
import { DirectorAttributes } from '../types/DirectorAttributes';
import { AuthorAttributes } from '../types/AuthorAttributes';
import { BookAttributes } from '../types/BookAttributes';
import { MovieAttributes } from '../types/MovieAttributes';
import Scrollbar from '../components/general/Scrollbar';
import axios from 'axios';

const FrontPage: React.FC = () => {
  const [directors, setDirectors] = useState<DirectorAttributes[]>([]);
  const [authors, setAuthors] = useState<AuthorAttributes[]>([]);
  const [books, setBooks] = useState<BookAttributes[]>([]);
  const [movies, setMovies] = useState<MovieAttributes[]>([]);

  const shuffleArray = (array: any[]): any[] => {
    let currentIndex = array.length;
    let temporaryValue;
    let randomIndex;

    while (currentIndex !== 0) {
      randomIndex = Math.floor(Math.random() * currentIndex);
      currentIndex -= 1;

      temporaryValue = array[currentIndex];
      array[currentIndex] = array[randomIndex];
      array[randomIndex] = temporaryValue;
    }

    return array;
  };

  useEffect(() => {
    async function fetchDirectors() {
      try {
        const response = await axios.get<DirectorAttributes[]>(
          `http://localhost:3001/directors`,
        );
        const fetchedDirectors = shuffleArray(response.data);
        setDirectors(fetchedDirectors);
      } catch (error) {
        console.error(error);
      }
    }
    async function fetchAuthors() {
      try {
        const response = await axios.get<AuthorAttributes[]>(
          `http://localhost:3001/authors`,
        );
        const fetchedAuthors = shuffleArray(response.data);
        setAuthors(fetchedAuthors);
      } catch (error) {
        console.error(error);
      }
    }
    async function fetchBooks() {
      try {
        const response = await axios.get<BookAttributes[]>(
          `http://localhost:3001/books`,
        );
        const fetchedBooks = shuffleArray(response.data);
        setBooks(fetchedBooks);
      } catch (error) {
        console.error(error);
      }
    }
    async function fetchMovies() {
      try {
        const response = await axios.get<MovieAttributes[]>(
          `http://localhost:3001/movies`,
        );
        const fetchedMovies = shuffleArray(response.data);
        setMovies(fetchedMovies);
      } catch (error) {
        console.error(error);
      }
    }

    fetchMovies();
    fetchBooks();
    fetchAuthors();
    fetchDirectors();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return (
    <div className="container text-text flex flex-col h-screen">
      <Header />
      <h1 className="text-center text-3xl flex-grow flex-shrink-0 mx-auto w-1/2">
        At a Glance
      </h1>

      <Scrollbar title="Movies I Love" data={movies} />
      <Scrollbar title="Directors I Love" data={directors} />
      <Scrollbar title="Philosophy I Find Interesting" data={books} />
      <Scrollbar title="Authors I Find Interesting" data={authors} />
    </div>
  );
};

export default FrontPage;
