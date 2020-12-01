import React from "react";
import { MovieType } from "../../api/movieApi";
import { MoviesSearchItem } from "./moviesSearchItem";
import style from './moviesSearchList.module.css'

interface Props {
  movies: MovieType[];
}

export const MoviesSearchList = React.memo((({movies}: Props) => {
  return (
    <ul>
      {movies.map((movie: MovieType) => (
        <li className={style.searchItem} key={movie.id}>
          <MoviesSearchItem movie={movie} />
        </li>
      ))}
    </ul>
  );
}))


MoviesSearchList.displayName = 'MoviesSearchList'