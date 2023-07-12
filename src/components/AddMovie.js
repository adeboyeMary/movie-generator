import React, {useRef} from 'react';

import styles from './AddMovie.module.css';

const AddMovie = (props) => {
   const titleInputRef = useRef('');
   const openingTextInputRef = useRef('');
   const releaseDateInputRef = useRef('');

    const submitHandler = (event) => {
        event.preventDefault();

        const movie = {
            title: titleInputRef.current.value,
            openingText: openingTextInputRef.current.value,
            releaseDate: releaseDateInputRef.current.value
        };
        props.onAddMovie(movie);
    };

    return(
        <form onSubmit={submitHandler} className={styles.form}>
            <div>
                <label fname='title'>Title</label>
                <input type='text' fname='title' ref={titleInputRef}></input>
            </div>
            <div>
                <label>OpeningText</label>
                <textarea rows='5' cols='90' ref={openingTextInputRef} ></textarea>
            </div>
            <div>
                <label fname='date'>Release Date</label>
                <input type='date' fname='date' ref={releaseDateInputRef}></input>
            </div>
            <button>Add Movie</button>
        </form>
    );
};

export default AddMovie;