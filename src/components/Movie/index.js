import React from "react";
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import PropTypes from "prop-types";
import { addFavorite, removeFavorite } from "./../../actions";
import "./style.scss";

const Movie = props => {
  const { title, vote_average, poster_path, release_date } = props.movieData;
  const { link } = props;
  const dispatch = useDispatch();

  const handleFavorite = () => {
    const { isFav, movieData } = props;
    isFav
      ? dispatch(removeFavorite(movieData.id))
      : dispatch(addFavorite(movieData));
  };

  return (
    <div className="movie">
      <div className="movie__img">
        <Link to={link}>
          <img
            src={`https://image.tmdb.org/t/p/w300/${poster_path}`}
            size={"40px"}
            alt="poster"
          />
        </Link>
      </div>

      <Link to={link} className="movie__link">
        <h3 className="movie__title">{title}</h3>
      </Link>

      <div className="movie__desc">
        <span className="movie__text">Age: </span>
        <span className="movie__text">{release_date}</span>
      </div>

      <div className="movie__desc">
        <span className="movie__text">Rating</span>
        <span className="movie__text">{vote_average}</span>
      </div>
      <div className="movie__btn">
        <button onClick={handleFavorite}>ADD </button>
      </div>
    </div>
  );
};

Movie.propTypes = {};

export default Movie;
