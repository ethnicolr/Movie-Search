import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useLocation } from "react-router-dom";

import { MovieType, pathnameType, fetchMovieType } from "../../api/movieApi";
import { fetchMovies } from "./moviesSlice";
import { RootState } from "./../../app/store";
import Spinner from "./../../app/Spinner";
import Movie from "./Movie";
import Pagination from "./../../app/Pagination";

interface ListProps {
  grid?: string;
  movieId?: string;
}

export const MoviesList = ({ movieId, grid = "" }: ListProps) => {
  const [page, setPage] = useState(0);
  const dispatch = useDispatch();
  const location = useLocation();
  const genres = useSelector((state: RootState) => state.filter.genres);
  const sortBy = useSelector((state: RootState) => state.filter.sortBy);
  const pages = useSelector((state: RootState) => state.movies.pages);
  const pathname = location.pathname as pathnameType;
  const search = location.search;

  console.log("update")
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
    let selectedGenres = genres
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

  let favorite = useSelector((state: RootState) => state.movies.favorite);
  // let isFetching = useSelector((state) => state.moviesList.isFetching);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location.key, sortBy, genres, page]);

  const moviesStatus = useSelector(
    (state: RootState) => state.movies.moviesStatus
  );
  let moviesList = useSelector((state: RootState) => state.movies.moviesList);

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
    <>
   <ul className="list-movies">
        {moviesList.map((movie) => {
          let isFav = favorite.some((favorite) => favorite.id === movie.id);
          return (
            <li className="list-movies__item" key={movie.id}>
              <Movie movieData={movie} isFav={isFav} />
            </li>
          );
        })}
      </ul>
      
       <Pagination
        forcePage={page}
        onPageChange={onPageChange}
        totalPages={pages}
      />
    {/* {isLoading ? <Spinner/> : <ul className="list-movies">
        {moviesList.map((movie) => {
          let isFav = favorite.some((favorite) => favorite.id === movie.id);
          return (
            <li className="list-movies__item" key={movie.id}>
              <Movie movieData={movie} isFav={isFav} />
            </li>
          );
        })}
      </ul>}
      
      {isLoading ? null : <Pagination
        forcePage={page}
        onPageChange={onPageChange}
        totalPages={pages}
      />} */}
      
    </>
  );
};

export default MoviesList;