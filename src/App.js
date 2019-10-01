import React, {useEffect, useState} from 'react';
import './App.css';

const useFetch = (url) => {
  const [responseData, setResponseData] = useState([])
  const [loading, setLoading] = useState(true)

   const fetchUrl = async () => {
     try{
      const response = await fetch(url)
      const json = await response.json()

      setResponseData(json)
      setLoading(false)
     } catch (e) {
      setLoading(false)
      console.log("You dun broke somethin", e)
     }
  }

  useEffect(() => {
    fetchUrl()
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

const App = () => {
  const [movies, loading] = useFetch('movie/popular')

  return (
    <div className="App">
      <header className="App-header">
        <h1>Movie Search</h1>
      </header>
      <div>
        <WithLoading loading={loading}>
          <ol>
            {movies.results && movies.results.length && movies.results.map(movie => <li key={movie.id}>
              <h2>{movie.title}</h2>
            </li>)}
          </ol>
        </WithLoading>
      </div>
    </div>
  );
}

export default App;
