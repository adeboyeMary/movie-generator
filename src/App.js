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
    const response = await fetch('https://swapi.dev/api/films/');
    if (!response.ok) {
      throw new Error('Something went wrong!')
    }

      const data = await response.json();

        const transformMovies = data.results.map(movieData => {
          return {
            id: movieData.id,
            title: movieData.title,
            openingText: movieData.opening_crawl,
            releaseDate: movieData.release_date
          };
        });
        setMovies(transformMovies);
  } catch (error){
    setError(error.message);
  }
    setIsLoading(false);
  }, []);

  useEffect(() => {
    FetchMoviesHandler();
  },[FetchMoviesHandler]);

  const addMovieHandler =(movie)=>{
    console.log(movie);
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
