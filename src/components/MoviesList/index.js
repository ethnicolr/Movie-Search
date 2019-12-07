import React from "react";
import PropTypes from "prop-types";

import Movie from "./../Movie";

import "./style.scss";

const MoviesList = ({ movies, favorite }) => {
  return (
    <ul className="list-movies">
      {movies.length
        ? movies.map(movie => {
            const isFav = favorite.every(fav => fav.id !== movie.id);
            return (
              <li className="list-movies__item" key={movie.id}>
                <Movie
                  link={`/movie/${movie.id}`}
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

MoviesList.propTypes = {};

export default MoviesList;
