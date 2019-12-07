import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchMovies } from "./../../actions";
import MoviesList from "./../MoviesList";
import Pagination from "./../Pagination";

const LoadMovies = props => {
  const { pathname, search } = props.location;

  const [page, setPage] = useState(0);

  const dispatch = useDispatch();

  const genres = useSelector(state => state.filter.activeGenres);
  const sortBy = useSelector(state => state.filter.sortBy);
  const pages = useSelector(state => state.moviesList.pages);

  useEffect(() => {
    if (pathname !== "/favorite") {
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
  }, [pathname, genres, dispatch, sortBy, search]);

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
  }

  return (
    <>
      <MoviesList movies={movies} favorite={favorite} />
      <Pagination
        forcePage={page}
        onPageChange={onPageChange}
        totalPages={pages}
      />
    </>
  );
};

export default LoadMovies;
