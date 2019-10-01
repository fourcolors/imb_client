import React, { useEffect, useState } from "react";
import "./App.css";

export const useFetch = (url, conditions = true) => {
  const [responseData, setResponseData] = useState([]);
  const [loading, setLoading] = useState(false);

  const fetchUrl = async url => {
    try {
      const response = await fetch(url);
      const json = await response.json();

      setResponseData(json);
      setLoading(false);
    } catch (error) {
      setLoading(false);
      console.log("You dun broke somethin", error);
    }
  };

  useEffect(() => {
    if (conditions) {
      setLoading(true);
      fetchUrl(url);
    }
  }, [url, conditions]);

  return [responseData, loading];
};
const MovieTile = ({ movie }) => {
  return (
    <li className="App-movie-tile">
      <a href={`/movie/${movie.id}`} target="_blank" rel="noopener noreferrer">
        <img
          className="App-movie-poster"
          src={`http://image.tmdb.org/t/p/w185/${movie.poster_path}`}
          alt={movie.title}
        />
      </a>
    </li>
  );
};

const MovieList = ({ movies }) => {
  if (movies.results) {
    return (
      <div>
        {movies.results.length ? (
          <ol className="App-list-parent">
            {movies.results.map(movie => (
              <MovieTile key={movie.id} movie={movie} />
            ))}
          </ol>
        ) : (
          <div>Search found no results</div>
        )}
      </div>
    );
  } else {
    return null;
  }
};

const PopularMovieList = ({ movies }) => {
  return (
    <div>
      <h2 className="App-header-2">Popular Movies</h2>
      <MovieList movies={movies} />
    </div>
  );
};

const SearchResults = ({ movies }) => {
  return (
    <div>
      <h2 className="App-header-2">Search Results</h2>
      <MovieList movies={movies} />
    </div>
  );
};

const App = () => {
  const [query, setQuery] = useState("");
  const [popularMovies, loading] = useFetch("movie/popular");
  const [searchResults, searching] = useFetch(
    `/search/movie?query=${query}`,
    query.trim().length
  );

  return (
    <div className="App">
      <header className="App-header">
        <h1>Movies</h1>
      </header>
      <input
        className="App-search"
        placeholder="Search by title..."
        type="text"
        onChange={e => setQuery(e.target.value)}
      />
      {query.trim().length ? (
        <SearchResults movies={searchResults} />
      ) : (
        <PopularMovieList movies={popularMovies} />
      )}
      {loading && <div>Loading...</div>}
      {searching && <div>Searching...</div>}
    </div>
  );
};

export default App;
