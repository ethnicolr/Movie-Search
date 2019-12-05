import React from "react";
import { useDispatch, useSelector } from "react-redux";
import PropTypes from "prop-types";

import Movie from "./../Movie";

import "./style.scss";

const MoviesList = ({ movies }) => {
  return (
    <ul className="list-movies">
      {movies.map(movie => {
        return (
          <li className="list-movies__item" key={movie.id}>
            <Movie link={`/movie/${movie.id}`} movieData={movie} />
          </li>
        );
      })}
    </ul>
  );
};

MoviesList.propTypes = {};

export default MoviesList;
