import React from 'react';

import styles from './Movie.module.css';

const Movie = (props) => {
    return (
        <ul className={styles.movies}>
            <li >
                <h2>{props.title}</h2>
                <h3>{props.releaseDate}</h3>
                <p>{props.openingText}</p>
            </li>
        </ul>
    );
};

export default Movie;