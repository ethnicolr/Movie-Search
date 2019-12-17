import React from "react";
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import PropTypes from "prop-types";
import { addFavorite, removeFavorite } from "./../../actions";
import "./style.scss";
import add from './../../style/add.svg'
import remove from './../../style/remove.svg'
import star from './../../style/star.svg'

const Movie = ({movieData, isFav }) => {
  const { title, vote_average, poster_path, release_date, first_air_date, name, media_type, id } = movieData;

  const dispatch = useDispatch();

  const handleFavorite = () => {
    isFav
      ? dispatch(removeFavorite(movieData.id))
      : dispatch(addFavorite(movieData));
  };
  const mode = isFav ? {backgroundImage: `url(${add})`} : {backgroundImage: `url(${remove})`};
  
  // link={`/movie/${movie.id}`}
  console.log(media_type);
  return (
    <div className="movie">
      <div className="movie__img">
        <Link to={`/movie/${id}`}>
          <img
            src={`https://image.tmdb.org/t/p/w300/${poster_path}`}
            alt="poster"
          />
        </Link>
      </div>
      <div className="movie__desc">
      <Link to={`/${media_type}/${id}`} className="movie__link">
        {/* <h3 className="movie__title">{title && name}</h3> */}

        <h3 className="movie__title">{title || name}</h3>
      </Link>
      <div className="movie__container">
        <span className="movie__text">Age: </span>
        <span className="movie__text">{release_date || first_air_date ? (release_date || first_air_date).split(/-/)[0] : null}</span>
      </div>

      <div className="movie__container">
        <span className="movie__text">Rating</span>
        <span className="movie__text">{vote_average}<img className="movie__thumb" src={star} alt="vote" size="10px"/></span>
        
      </div>
      </div>

      

      
      <div className="movie__button">
        <button className="movie__btn" style={mode} onClick={handleFavorite} />
        </div>
    </div>
  );
};

Movie.propTypes = {};

export default Movie;
