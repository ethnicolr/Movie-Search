import React from "react";
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { addFavorite } from "./../../actions";
import Image from "./../Image";
import add from './../../style/add.svg'
import remove from './../../style/remove.svg'
import star from './../../style/star.svg'
import "./style.scss";

const Movie = ({movieData, isFav }) => {
  const { title, vote_average, poster_path, release_date, first_air_date, name, media_type, id } = movieData;

  const dispatch = useDispatch();

  const handleFavorite = () => {
    dispatch(addFavorite(movieData));
  };
  const mode = isFav ? {backgroundImage: `url(${add})`} : {backgroundImage: `url(${remove})`};
  
  let link = media_type ? media_type : "movie";
  return (
    <div className="movie">
      <div className="movie__img">
        <Link to={`/${link}/${id}`}>
          <Image
            src={`https://image.tmdb.org/t/p/w300/${poster_path}`}
            size="100%"
          />
        </Link>
      </div>
      <div className="movie__desc">
      <Link to={`/${media_type}/${id}`} className="movie__link">

        <h3 className="movie__title">{title || name}</h3>
      </Link>
      <div className="movie__container movie__container--underline">
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


export default Movie;
