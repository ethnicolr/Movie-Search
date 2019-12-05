import React, { useEffect, useRef  } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import {fetchMovies} from './../../actions'
import MoviesList from './../MoviesList'

const LoadMovies = props => {
    const dispatch = useDispatch()

    useEffect(() => {
            dispatch(fetchMovies(props.location.pathname))
        
    }, [props.location.pathname])

    const movies = useSelector(state => state.moviesList.movies);


    return (
        <>
            <MoviesList movies={movies}/>
        </>
    )
}



export default LoadMovies;