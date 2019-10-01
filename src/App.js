import React, {useEffect, useState, useCallback} from 'react';
import './App.css';
import _ from 'lodash'

const useFetch = (url, conditions=true) => {
  const [responseData, setResponseData] = useState([])
  const [loading, setLoading] = useState(false)

  const fetchUrl = async (url) => {
    try{
      const response = await fetch(url)
      const json = await response.json()

      setResponseData(json)
      setLoading(false)
    } catch (error) {
      setLoading(false)
      console.log("You dun broke somethin", error)
    }
  }

  useEffect(() => {
    if (conditions) {
      setLoading(true)
      fetchUrl(url)
    }
  }, [url, conditions]);

  return [responseData, loading]
}

const WithLoading = ({loading, children}) => {
  if(loading) {
    return <div>Loading...</div>
  } else {
    return {...children}
  }
}

const MovieList = ({movies}) => {
  if (movies.results)  {
    return(
      <div>
          {movies.results.length ? 
            <ol>
            {movies.results.map(movie => 
                  <li key={movie.id}>
                    <h2>{movie.title}</h2>
                  </li>)}
              </ol>
            :
            <div>Search found no results</div>
        }
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
  const [query, setQuery] = useState('')
  const [popularMovies, loading] = useFetch('movie/popular')
  const [searchResults, searching] = useFetch(`/search/movie?query=${query}`, query.trim().length)

  return (
    <div className="App">
      <header className="App-header">
        <h1>Movie Search</h1>
        <input type="search" onChange={(e) => setQuery(e.target.value)}/>
      </header>
        {query.trim().length ? <SearchResults movies={searchResults} /> : <PopularMovieList movies={popularMovies} />}
        {loading && <div>Loading...</div>}
        {searching && <div>Searching...</div>}
    </div>
  );
}

export default App;
