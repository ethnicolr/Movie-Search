import React from "react";
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import {Image} from "../../app/image";
import add from "./../../style/correct.svg";
import remove from "./../../style/minus.svg";
import star from "./../../style/star.svg";
import { addFavorite, deleteFavorite } from "./moviesSlice";
import { MovieType } from "../../api/movieApi";
import style from './moviesListItem.module.css'

type PropMovie = {
  movieData: MovieType;
  isFav: boolean;
};

export const Movie = React.memo(({movieData, isFav } : PropMovie) => {
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

  const link = media_type ? media_type : "movie";
  return (
    <div className={style.movie}>
      <div className={style.img}>
        <Link to={`/${link}/${id}`}>
          <Image
            src={`https://image.tmdb.org/t/p/w300/${poster_path}`}
          />
        </Link>
      </div>

      <div className={style.desc}>
        <Link to={`/${media_type}/${id}`}>
          <h3 className={style.title}>{title || name}</h3>
        </Link>
        <div className={`${style.container} ${style.underline}`}>
          <span className={style.text}>Age: </span>
          <span className={style.text}>
            {release_date || first_air_date
              ? (release_date || first_air_date).split(/-/)[0]
              : null}
          </span>
        </div>

        <div className={style.container}>
          <span className={style.text}>Rating</span>
          <span className={style.text}>
            {vote_average}
            <img className={style.thumb} src={star} alt="vote" />
          </span>
        </div>
      </div>
      <button className={style.btn} onClick={handleFavorite}>
        <img src={isFav ? add : remove} alt="favorite" />
      </button>
    </div>
  );
})

Movie.displayName = "Moviu"

