import React, { useEffect, useRef  } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import {fetchMovies} from './../../actions'
import MoviesList from './../MoviesList'

const LoadMovies = props => {
    const {pathname} = props.location;

    const dispatch = useDispatch()
    
    const genres = useSelector(state => state.filter.activeGenres);
    const sortBy = useSelector(state => state.filter.sortBy);

    useEffect(() => {
        if (pathname !== "/favorite"){
            dispatch(fetchMovies({
                path: pathname,
                genres: genres,
                sortBy: sortBy

            }))
        }
        
    }, [pathname,genres, dispatch, sortBy])

    let movies = useSelector(state => state.moviesList.movies);
    let favorite = useSelector(state => state.favorite);
    

    if (pathname === "/favorite"){
        movies = favorite;
    }

    return (
        <>
            <MoviesList movies={movies} favorite={favorite} />
        </>
    )
}



export default LoadMovies;