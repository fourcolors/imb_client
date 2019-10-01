import React from "react";
import { useFetch } from "./App";

const Movie = params => {
  const [movie, loading] = useFetch(`/movie/${params.id}`);

  return (
    <>
      <div>
        <h2>{movie.title}</h2>
        <p>{movie.overview}</p>
      </div>
      {loading && <div>Loading...</div>}
    </>
  );
};

export default Movie;
