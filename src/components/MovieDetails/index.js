import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { addFavorite } from "./../../actions";
import LoadMovies from "./../LoadMovies";
import Image from "./../Image";
import vote from "./../../style/star.svg";
import "./style.scss";

const MovieDetails = ({ data, credits, movieId, favorite }) => {
  const {
    title,
    vote_average,
    backdrop_path,
    poster_path,
    overview,
    tagline,
    release_date,
    first_air_date,
    genres,
    runtime,
    episode_run_time,
    number_of_seasons,
    name,
    id
  } = data;

  const dispatch = useDispatch();

  const handleFavorite = () => {
    dispatch(addFavorite(data));
  };

  

  const background = {
    backgroundImage: `url('https://image.tmdb.org/t/p/w1280/${backdrop_path}')`,
    backgroundAttachment: 'fixed',
    backgroundRepeat: 'no-repeat',
    backgroundSize: 'cover',
  };

  let budget = data.budget
    ? `$ ${data.budget.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".")}`
    : null;

  const genresList = genres
    ? genres.map(movie => ` ${movie.name}`).join()
    : null;

  const castList = credits.length
    ? credits
        .slice(0, 10)
        .map(item => ` ${item.name}`)
        .join()
    : null;

  const date =
    release_date || first_air_date
      ? (release_date || first_air_date).split(/-/)[0]
      : null;

      const isFavorite = favorite.every(e => e.id !== id);

  return (
    <div className="movie-details" style={background}>
      <div className="movie-details__container">
        <div className="movie-details__left-column">
          <Image
            src={`https://image.tmdb.org/t/p/w500/${poster_path}`}
            size={"100%"}
          />
        </div>
        <div className="movie-details__right-column">
          <div className="movie-details__heading">
            <h1 className="movie-details__title"> {title || name} </h1>
            <span className="movie-details__vote">
              {`${vote_average} `}
              <img className="movie-details__thumb" src={vote} alt="vote" />
            </span>
          </div>
          <h4 className="movie-details__tagline"> {tagline} </h4>
          <p className="movie-details__overview"> {overview} </p>
          <div className="movie-details__desc">
            <h2 className="movie-details__subtitle"> Year: </h2>
            <p className="movie-details__text"> {date} </p>
          </div>
          <div className="movie-details__desc">
            <h2 className="movie-details__subtitle"> Genre: </h2>
            <p className="movie-details__text"> {genresList} </p>
          </div>
          <div className="movie-details__desc">
            <h2 className="movie-details__subtitle"> Main Cast: </h2>
            <p className="movie-details__text"> {castList} </p>
          </div>
          <div className="movie-details__desc">
            <h2 className="movie-details__subtitle"> Run time: </h2>
            <p className="movie-details__text">
              
              {episode_run_time || runtime} {" min"}
            </p>
          </div>
          <div className="movie-details__desc">
            <h2 className="movie-details__subtitle"> Budget: </h2>
            <p className="movie-details__text"> {budget} </p>
          </div>
          {number_of_seasons ? (
            <div className="movie-details__desc">
              <h2 className="movie-details__subtitle"> Number of seasons: </h2>
              <p className="movie-details__text"> {number_of_seasons} </p>
            </div>
          ) : null}
          <button className="movie-details__btn" onClick={handleFavorite}>{isFavorite ? "+ Add to Favorite" : "- Delete from Favorite"}</button>
        </div>
      </div>
      <div className="movie-details__recomend">
        <h2 className="movie-details__headline"> Recommendations </h2>
        {id ? <LoadMovies movieId={id} grid={"list-movies--small"} /> : null}
        
      </div>
    </div>
  );
};


export default MovieDetails;
