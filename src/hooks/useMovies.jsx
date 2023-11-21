"use client";

import { useMoviesContext } from "@/context/movies";
import { searchMovies } from "@/services/movies";
import { useRef, useState, useCallback, useMemo } from "react";

export function useMovies() {
  const { movies, sort, setMovies, loading, setLoading } = useMoviesContext();
  const [error, setError] = useState(null);
  const previousSearch = useRef(null);

  // useCallback es mas aporpiado para memorizar y retonar funciones
  const getMovies = useCallback(async ({ query }) => {
    if (query === previousSearch.current) return;
    try {
      setLoading(true);
      previousSearch.current = query;
      const newMovies = await searchMovies({ query });
      setMovies(newMovies);
    } catch (error) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  }, []);

  const sortedMovies = useMemo(() => {
    return sort
      ? [...movies].sort((a, b) => a.title.localeCompare(b.title))
      : movies;
  }, [sort, movies]);

  return { movies: sortedMovies, getMovies, errorMessage: error, loading };
}
