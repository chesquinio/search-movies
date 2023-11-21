"use client";

import { createContext, useContext, useState } from "react";

const MoviesContext = createContext();

export const MoviesProvider = ({ children }) => {
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(false);
  const [sort, setSort] = useState(false);

  return (
    <MoviesContext.Provider
      value={{ movies, setMovies, loading, setLoading, sort, setSort }}
    >
      {children}
    </MoviesContext.Provider>
  );
};

export const useMoviesContext = () => {
  const context = useContext(MoviesContext);

  return context;
};
