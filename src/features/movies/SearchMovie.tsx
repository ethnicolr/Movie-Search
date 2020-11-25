import React from "react";
import { Link } from "react-router-dom";
import Image from "../../Image";
import star from "./../../style/star.svg";
import "./style.scss";
import {MovieType} from '../../api/movieApi'

type SearchProps = {data: MovieType}

export const SearchMovie = ( {data}: SearchProps) => {
  const {
    title,
    name,
    release_date,
    first_air_date,
    poster_path,
    id,
    vote_average,
    media_type,
  } = data;
  const link = media_type ? media_type : "movie";
  return (
      <Link to={`/${link}/${id}`} className="search-list__link">
        <Image
          src={`https://image.tmdb.org/t/p/w300/${poster_path}`}
          size={"50px"}
        />
        <h2 className="search-list__title">
          {`${title || name} ${
            release_date || first_air_date
              ? `(${(release_date || first_air_date).split(/-/)[0]})`
              : null
          }`}
        </h2>
        <span className="search-list__vote">
          {vote_average ? vote_average.toFixed(1) : 0}
          <img className="search-list__thumb" src={star} alt="vote" />
        </span>
      </Link>
  );
}