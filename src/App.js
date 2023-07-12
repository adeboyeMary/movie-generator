import React, {useCallback, useEffect, useState} from 'react';
import './App.css';

import AddMovie from './components/AddMovie';
import MovieList from './components/MovieList';
// import Card from './components/UI/Card';


const App = () => {
  const [movies, setMovies] = useState([]);
  const [isLoading,setIsLoading] = useState(false);
  const [error, setError] = useState(null);

 const FetchMoviesHandler = useCallback(async() => {
  setIsLoading(true);
  setError(null);
  try{
    const response = await fetch('https://react-http-78d30-default-rtdb.firebaseio.com/movies.json');
    if (!response.ok) {
      throw new Error('Something went wrong!')
    }

      const data = await response.json();
      // console.log(data);

      const loadedMovies = [];

      for (const key in data){
        loadedMovies.push({
          id: key,
          title: data[key].title,
          openingText: data[key].openingText,
          releaseDate: data[key].releaseDate
        })
      };
        setMovies(loadedMovies);
  } catch (error){
    setError(error.message);
  }
    setIsLoading(false);
  }, []);

  useEffect(() => {
    FetchMoviesHandler();
  },[FetchMoviesHandler]);

  async function addMovieHandler(movie) {
    const response = await fetch('https://react-http-78d30-default-rtdb.firebaseio.com/movies.json', {
      method: 'POST',
      body: JSON.stringify(movie),
      headers: {
        'Content-Type': 'application/json'
      }
    });

    const data= await response.json();
    console.log(data);
  };


  let content = <p>Found no movies.</p>;
  if(movies.length > 0) {
    content = <MovieList movies={movies} />;
  };
  if(error){
    content = <p>{error}</p>;
  };
  if(isLoading){
    content = <p>Loading...</p>
  };

  return (
    <React.Fragment>
      <section>
        <AddMovie onAddMovie={addMovieHandler} />
      </section>
      <section>
        <button onClick={FetchMoviesHandler}>Fetch Movies</button>
      </section>

      <section>
        {content}
      </section>
    </React.Fragment>
  );
};

export default App;
