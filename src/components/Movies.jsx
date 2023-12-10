"use client";

import { useMovies } from "@/hooks/useMovies";

function resolveMovies({ movies }) {
  return (
    <ul className="form">
      {movies?.map((movie) => (
        <li
          key={movie.id}
          className="flex flex-col justify-center items-center text-white bg-gray-700 rounded px-5 py-2"
        >
          <h2>{movie.title}</h2>
          <p>{movie.year}</p>
          <div className="mt-2">
            <img src={movie.image} alt={movie.title} className="rounded" />
          </div>
        </li>
      ))}
    </ul>
  );
}

function notResolveMovies() {
  return (
    <>
      <p>No se encontraron peliculas...</p>
    </>
  );
}

export default function Movies() {
  const { movies, loading } = useMovies();

  return (
    <>
      {loading ? (
        <p>Cargando...</p>
      ) : movies ? (
        resolveMovies({ movies })
      ) : (
        notResolveMovies()
      )}
    </>
  );
}
