import React from "react";
import PropTypes from "prop-types";
import CastList from "./../CastList";
import LoadMovies from "./../LoadMovies";
import "./style.scss";

const MovieDetails = ({ data, credits, movieId }) => {
  const {
    title,
    vote_average,
    backdrop_path,
    poster_path,
    overview,
    tagline,
    release_date,
    genres,
    runtime
  } = data;

  const background = {
    background: `url('https://image.tmdb.org/t/p/w1280/${backdrop_path}')`,
    backgroundAttachment: "fixed",
    backgroundRepeat: "no-repeat",
    backgroundSize: "cover"
  };

  let budget = data.budget;

  budget = budget
    ? `$ ${budget.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".")}`
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

  return (
    <div className="movie-details" style={background}>
      <div className="movie-details__container">
        <div className="movie-details__left-column">
          <img
            src={`https://image.tmdb.org/t/p/w300/${poster_path}`}
            size={"100%"}
            alt="poster"
          />
        </div>

        <div className="movie-details__right-column">
          <h1 className="movie-details__title">{title}</h1>
          <div className="movie-details__info">
            {/* <span className="movie-details__date">
            {release_date.split(/-/)[0]}
          </span> */}
            <span className="movie-details__vote">
              {`${vote_average} `}
              <img
                src="./../src/styles/star.svg"
                className="preview-movies__thumb"
                alt="vote"
              />
            </span>
            <span className="movie-details__time">
              {`${(runtime / 60).toFixed(1)} h.`}
            </span>
          </div>
          <p className="movie-details__text">{genresList}</p>
          <h4 className="movie-details__tagline">{tagline}</h4>
          <p className="movie-details__text ">{overview}</p>
          <p className="movie-details__text ">
            <span className="movie-details__span">Main Cast:</span>
            {castList}
          </p>
          <p className="movie-details__text">
            <span className="movie-details__span">Budget: </span>
            {budget}
          </p>
        </div>
      </div>
      <div className="movie-details__cast">
      <h2 className="movie-details__headline">Cast</h2>
      <CastList cast={credits} />
      </div>
      <div className="movie-details__recomend">
      <h2 className="movie-details__headline">Recommendations</h2>
      <LoadMovies location={{pathname: "/similar", search: movieId}} />
      </div>
    </div>
  );
};

MovieDetails.propTypes = {};

export default MovieDetails;
