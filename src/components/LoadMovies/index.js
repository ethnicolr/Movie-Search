import React, { useEffect, useRef  } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import {fetchMovies} from './../../actions'
import MoviesList from './../MoviesList'

function LoadMovies(props) {
    const dispatch = useDispatch()

    const movies = useSelector(state => state.moviesList.movies);
    console.log(movies);

    const usePrevious = value => {
        const ref = useRef();
        useEffect(() => {
          ref.current = value;
        });
        return ref.current;
      };

      const prevList = usePrevious(movies);


    useEffect(() => {
            dispatch(fetchMovies(props.location.pathname))
        
    }, [])

    return (
        <div>
            <MoviesList movies={movies}/>
        </div>
    )
}

export default LoadMovies;