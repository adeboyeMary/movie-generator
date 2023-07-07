import React from 'react';

import Movie from './Movie';
import Card from './UI/Card';

const MovieList = (props) => {
    return (
        <Card>
            {props.movies.map((movie) =>
                <Movie 
                    id={movie.id}
                    title={movie.title}
                    releaseDate={movie.releaseDate}
                    openingText={movie.openingText}
                />
            )}
        </Card>
    );
};

export default MovieList;