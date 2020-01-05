import React from "react";
import Movie from "./../Movie";

import "./style.scss";

const MoviesList = ({ movies, favorite, size }) => {
  let grid = size ? `list-movies list-movies--${size}` : "list-movies"
  return (
    <ul className={grid}>
      {movies.length
        ? movies.map(movie => {
            const isFav = favorite.every(fav => fav.id !== movie.id);
            return (
              <li className="list-movies__item" key={movie.id}>
                <Movie
                  movieData={movie}
                  isFav={!isFav}
                />
              </li>
            );
          })
        : null}
    </ul>
  );
};


export default MoviesList;
