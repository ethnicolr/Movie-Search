import React from "react";

import { MovieType } from "../../api/movieApi";
import Movie from "./Movie"; 

interface MoviesProp {
  movies: MovieType[];
  favorite: MovieType[];
}

const List = ({ movies, favorite }: MoviesProp) => {
  return (
    <div className="list-movies">
      <ul className="list-movies__items">
        {movies.map((movie) => {
          let isFav = favorite.some((favorite) => favorite.id === movie.id);
          return (
            <li className="list-movies__item" key={movie.id}>
              <Movie movieData={movie} isFav={isFav} />
            </li>
          );
        })}
      </ul>
    </div>
  );
};

export default List;
