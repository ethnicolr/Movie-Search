import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useLocation } from "react-router-dom";

import { MovieType, pathnameType, fetchMovieType } from "../../api/movieApi";
import { fetchMovies } from "./moviesSlice";
import { RootState } from "./../../app/store";
import Spinner from "./../../app/Spinner";
import Movie from "./Movie";
import Pagination from "./../../app/Pagination";
import ListMovies from "./ListMovies";

interface ListProps {
  grid?: string;
  movieId?: string;
}

export const LoadMovies = ({ movieId, grid = "" }: ListProps) => {
  const [page, setPage] = useState(0);

  const dispatch = useDispatch();
  const location = useLocation();

  let moviesList = useSelector((state: RootState) => state.movies.moviesList);
  const favorite = useSelector((state: RootState) => state.movies.favorite);
  const moviesStatus = useSelector((state: RootState) => state.movies.moviesStatus);
  const genres = useSelector((state: RootState) => state.filter.genres);
  const sortBy = useSelector((state: RootState) => state.filter.sortBy);
  const pages = useSelector((state: RootState) => state.movies.pages);

  const pathname = location.pathname as pathnameType;
  const search = location.search;

  useEffect(() => {
    if ((pathname as "/favorite") === "/favorite") return;
    if (movieId) {
      dispatch(
        fetchMovies({
          pathname: "/similar",
          options: {
            search: movieId,
          },
        })
      );
      return;
    }
    
    const selectedGenres = genres
      .filter((genre) => genre.selected)
      .map((genre) => genre.id);

    dispatch(
      fetchMovies({
        pathname: pathname as fetchMovieType,
        options: {
          search,
          genres: selectedGenres,
          sortBy,
          page: page + 1,
        },
      })
    );
  }, [pathname, sortBy, search, movieId, genres, page]);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location.key, sortBy, genres, page]);

  let isFavMoviesList = false;

  if ((pathname as "/favorite") === "/favorite") {
    moviesList = favorite;
    isFavMoviesList = true;
  }

  interface Pagin {
    selected: number;
  }

  const onPageChange = (data: Pagin) => {
    setPage(data.selected);
  };

  let isLoading = moviesStatus === "pendiing";
  return (
    <div className="list-movies">
      <ListMovies movies={moviesList} favorite={favorite} />
      <Pagination
              forcePage={page}
              onPageChange={onPageChange}
              totalPages={pages}
            />
    </div>
  );
};

export default LoadMovies;
