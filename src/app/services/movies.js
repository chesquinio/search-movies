export const searchMovies = async ({ query }) => {
  if (query === "") return null;

  try {
    const response = await fetch(
      `http://www.omdbapi.com/?apikey=50fc5f85&s=${query}`
    );
    const json = await response.json();

    const movies = json.Search;

    return movies?.map((movie) => ({
      id: movie.imdbID,
      title: movie.Title,
      image: movie.Poster,
      year: movie.Year,
      type: movie.Type,
    }));
  } catch (error) {
    throw new Error("Hubo un problema en el fetching");
  }
};
