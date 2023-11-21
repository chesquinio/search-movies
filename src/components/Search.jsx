"use client";

import { useMoviesContext } from "@/context/movies";
import { useMovies } from "@/hooks/useMovies";
import { useSearch } from "@/hooks/useSearch";
import debounce from "just-debounce-it";
import { useCallback } from "react";

export default function Search() {
  const { sort, setSort } = useMoviesContext();

  const { query, setQuery, error } = useSearch();
  const { getMovies, errorMessage } = useMovies();

  // se ejecuta la funcion, despues de 300ms, y el useCallback
  // provoca que solo se genere cuando cambie la función getMovies
  const debounceGetMovies = useCallback(
    debounce((query) => {
      getMovies({ query });
    }, 300),
    [getMovies]
  );

  const handleSort = () => {
    if (query) setSort(!sort);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    getMovies({ query });
  };

  const handleChange = (event) => {
    const newQuery = event.target.value;
    if (newQuery.startsWith(" ")) return;
    setQuery(newQuery);
    debounceGetMovies(newQuery);
  };
  return (
    <>
      <h1 className="mb-8 text-center">Buscador de Peliculas</h1>
      <form
        onSubmit={handleSubmit}
        className="flex justify-center items-center mx-4"
      >
        <input
          name="movieName"
          value={query}
          onChange={handleChange}
          className="inline sm:w-3/4"
          type="text"
        />
        <input
          type="checkbox"
          title="Ordenar peliculas"
          onChange={handleSort}
        />
        <button type="submit" className="sm:w-1/4">
          Buscar
        </button>
      </form>
      {error && <p className="text-red-500 mx-5">{error}</p>}
      {errorMessage ? <p>{errorMessage}</p> : null}
    </>
  );
}
