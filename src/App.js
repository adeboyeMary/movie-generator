import React, {useState} from 'react';

import styles from './components/button.module.css';
import MovieList from './components/MovieList';
import Card from './components/UI/Card';


const App = () => {
  const [movies, setMovies] = useState([]);
  const [isLoading,setIsLoading] = useState(false);
  const [error, setError] = useState(null);

 async function FetchMoviesHandler () {
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
  };

  let content = <Card><p>Found no movies.</p></Card>;
  if(movies.length > 0) {
    content = <MovieList movies={movies} />;
  };
  if(error){
    content = <Card><p>{error}</p></Card>;
  };
  if(isLoading){
    content = <Card><p>Loading...</p></Card>
  };

  return (
    <React.Fragment>
      <Card>
        <button onClick={FetchMoviesHandler} className={styles.bttn}>
          Fetch Movies
        </button>
      </Card>

      <section>
        {content}
      </section>
    </React.Fragment>
  );
};

export default App;
