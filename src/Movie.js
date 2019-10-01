import React from "react";
import { useFetch } from "./App";
import "./Movie.css";

const Movie = params => {
  const [movie, loading] = useFetch(`/movie/${params.id}`);

  return (
    <>
      <div className="Movie-container">
        <div className="Movie-details">
          <h2 className="Movie-title">{movie.title}</h2>
          <p className="Movie-overview">{movie.overview}</p>
          <ul className="Movie-alt-details">
            <li>
              <strong>Status</strong> {movie.status}
            </li>
            <li>
              <strong>Release Date</strong> {movie.release_date}
            </li>
            <li>
              <strong>Revenue</strong> ${movie.revenue}
            </li>
            <li>
              <strong>Rating</strong> {movie.vote_average} / 10
            </li>
            <li>
              <strong>Number of Ratings</strong> {movie.vote_count}
            </li>
          </ul>
        </div>
        <div className="Movie-poster-container">
          <img
            className="Movie-movie-poster"
            src={`http://image.tmdb.org/t/p/w500/${movie.poster_path}`}
            alt={movie.title}
          />
        </div>
      </div>
      {loading && <div>Loading...</div>}
    </>
  );
};

export default Movie;
