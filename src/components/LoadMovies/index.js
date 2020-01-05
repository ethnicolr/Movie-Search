import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useLocation } from 'react-router-dom'
import { fetchMovies } from './../../actions';
import MoviesList from './../MoviesList';
import Pagination from './../Pagination';

const LoadMovies = ({movieId, size}) => {

  const [page, setPage] = useState(0);
  let location = useLocation();
  const dispatch = useDispatch();
  const genres = useSelector(state => state.filter.activeGenres);
  const sortBy = useSelector(state => state.filter.sortBy);
  let pages = useSelector(state => state.moviesList.pages);
  const { pathname, search } = location;
  
  useEffect(() => {
    if (movieId){
      dispatch(
        fetchMovies({
          path: "/similar",
          search: movieId
        })
      );
    } else if (pathname !== "/favorite") {
      dispatch(
        fetchMovies({
          path: pathname,
          genres: genres,
          sortBy: sortBy,
          search: search
        })
      );
      setPage(0);
    }
  }, [pathname, genres, dispatch, sortBy, search, movieId]);

  const onPageChange = data => {
    setPage(data.selected);
    dispatch(
      fetchMovies({
        path: pathname,
        genres: genres,
        sortBy: sortBy,
        search: search,
        page: ++data.selected
      })
    );
  };

  let movies = useSelector(state => state.moviesList.movies);
  let favorite = useSelector(state => state.favorite);

  if (pathname === "/favorite") {
    movies = favorite;
    pages = 0
  } else if (movieId) {
    pages = 0;
  }

  return (
    <>
      <MoviesList movies={movies} favorite={favorite} size={size}/>
      <Pagination
        forcePage={page}
        onPageChange={onPageChange}
        totalPages={pages}
      />
    </>
  );
};

export default LoadMovies;
