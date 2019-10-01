import React, {useEffect, useState, useCallback} from 'react';
import './App.css';


const fetchUrl = async (url, onSuccess, onError) => {
  try{
    const response = await fetch(url)
    const json = await response.json()

    onSuccess(json)
  } catch (e) {
    onError(e)
  }
}

const useFetch = (url) => {
  const [responseData, setResponseData] = useState([])
  const [loading, setLoading] = useState(true)

  const onSuccess = (json) => {
    setResponseData(json)
    setLoading(false)
  }

  const onError = (error) => {
    setLoading(false)
    console.log("You dun broke somethin", error)
  }

  useEffect(() => {
    fetchUrl(url, onSuccess, onError)
  }, [url]);

  return [responseData, loading]
}

const WithLoading = ({loading, children}) => {
  if(loading) {
    return <div>Loading...</div>
  } else {
    return {...children}
  }
}

const MovieList = ({listTitle, movies}) => {
  if (movies)  {
    return(
      <div>
        <ol>
          {movies.results && movies.results.length && movies.results.map(movie => 
            <li key={movie.id}>
              <h2>{movie.title}</h2>
            </li>)}
        </ol>
      </div>
    )
  } else {
    return null
  }
}

const PopularMovieList = ({movies}) => {
  return(
    <div>
      <h2>Popular Movies</h2>
      <MovieList movies={movies} />
    </div>
  )
}

const SearchResults = ({movies}) => {
  return(
    <div>
      <h2>Search Results</h2>
      <MovieList movies={movies} />
    </div>
  )
}

const App = () => {
  const [popularMovies, popularMoviesLoading] = useFetch('movie/popular')
  const [query, setQuery] = useState('')


  return (
    <div className="App">
      <header className="App-header">
        <h1>Movie Search</h1>
        <input type="search" onChange={(e) => setQuery(e.target.value)}/>
      </header>
      <WithLoading loading={popularMoviesLoading}>
        {query.trim().length ? <div>search results</div> : <PopularMovieList movies={popularMovies} />}
      </WithLoading>
    </div>
  );
}

export default App;
