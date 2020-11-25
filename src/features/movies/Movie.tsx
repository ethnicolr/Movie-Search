import React from "react";
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import Image from "./../../Image";
import add from "./../../style/correct.svg";
import remove from "./../../style/minus.svg";
import star from "./../../style/star.svg";
import { addFavorite, deleteFavorite } from "../movies/moviesSlice";
import { MovieType } from "./../../api/movieApi";
import "./style.scss";

type PropMovie = {
  movieData: MovieType;
  isFav: boolean;
};

const Movie = ({ movieData, isFav }: PropMovie) => {
  const {
    title,
    vote_average = 0,
    poster_path,
    release_date,
    first_air_date,
    name,
    media_type,
    id,
  } = movieData;
  const dispatch = useDispatch();

  const handleFavorite = () => {
    isFav ? dispatch(deleteFavorite(id)) : dispatch(addFavorite(movieData));
  };

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
          <span className="movie__text">
            {release_date || first_air_date
              ? (release_date || first_air_date).split(/-/)[0]
              : null}
          </span>
        </div>

        <div className="movie__container">
          <span className="movie__text">Rating</span>
          <span className="movie__text">
            {vote_average}
            <img className="movie__thumb" src={star} alt="vote" />
          </span>
        </div>
      </div>
      <button className="movie__btn" onClick={handleFavorite}>
        <img src={isFav ? add : remove} alt="favorite" />
      </button>
    </div>
  );
};

export default Movie;
