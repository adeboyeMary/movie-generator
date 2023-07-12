import React from 'react';

import Movie from './Movie';


const MovieList = (props) => {
    return (
        <>
            {props.movies.map((movie) =>
                <Movie 
                    id={movie.id}
                    title={movie.title}
                    releaseDate={movie.releaseDate}
                    openingText={movie.openingText}
                />
            )}
        </>
    );
};

export default MovieList;