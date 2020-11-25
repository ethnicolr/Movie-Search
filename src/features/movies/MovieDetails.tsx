import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams, useLocation } from "react-router-dom";
import { addFavorite, deleteFavorite } from "./moviesSlice";
import { getUrl } from "../../api/movieApi";
import  MoviesList  from "./MoviesList";
import Image from "../../Image";
import vote from "./../../style/star.svg";
import add from "./../../style/correct.svg";
import remove from "./../../style/minus.svg";
import { DetailsResult, Details, fetchDetails } from "../../api/movieApi";

type DetailsProps = { media_type: keyof typeof getUrl };

interface RootState {
  movies: {
    favorite: [];
  };
}

interface Movie {
  id: number;
}

export const MovieDetails = () => {
  const [data, setData] = React.useState<DetailsResult | null>(null);
  const [error, setError] = React.useState(null);
  const { movieId, media_type } = useParams();
  const dispatch = useDispatch();
  const location = useLocation();

  useEffect(() => {
    const fetchData = async () => {
      try {
        let data = await fetchDetails(movieId);
        setData(data);
      } catch (err) {
        setError(err);
      }
    };
    fetchData();
  }, [media_type, movieId]);

  const favorite = useSelector((state: RootState) => state.movies.favorite);
  const isFav = favorite.some((favorite: Movie) => {
    return favorite.id == movieId;
  });

  if (error) {
    return <div>{error}</div>;
  }

  if (!data) {
    return null;
  }

  const {
    title,
    vote_average,
    poster_path,
    overview,
    tagline,
    release_date,
    first_air_date,
    genres = [],
    runtime,
    episode_run_time,
    name,
    id,
    production_countries = [],
    budget = 0,
  } = data.movieDetails;

  const handleFavorite = () => {
    if (isFav) {
      dispatch(deleteFavorite(data.movieDetails.id));
    } else {
      dispatch(
        addFavorite({
          id,
          title,
          vote_average,
          poster_path,
          release_date,
          name,
          first_air_date,
          media_type,
        })
      );
    }
  };

  const genresList = genres.length
    ? genres.map((movie) => ` ${movie.name.toLowerCase()}`).join()
    : null;
  const countries = production_countries.length
    ? production_countries.map((e) => ` ${e.name}`).join()
    : null;
  const castList = data.cast
    ? data.cast
        .slice(0, 10)
        .map((item) => ` ${item.name}`)
        .join()
    : null;
  const formatBudget = `$ ${budget
    .toString()
    .replace(/\B(?=(\d{3})+(?!\d))/g, ".")}`;

  return (
    <div className="movie-details">
      <div className="movie-details__container">
        <div className="movie-details__left-column">
          <Image
            src={`https://image.tmdb.org/t/p/w500/${poster_path}`}
            size={"100%"}
          />
        </div>
        <div className="movie-details__right-column">
          <div className="movie-details__heading">
            <h2 className="movie-details__title"> {title || name} </h2>
            <span className="movie-details__vote">
              {`${vote_average} `}
              <img className="movie-details__thumb" src={vote} alt="vote" />
            </span>
          </div>

          {release_date || first_air_date ? (
            <div className="movie-details__info">
              <h3 className="movie-details__tagline">Year</h3>
              <p className="movie-details__text">
                {(release_date || first_air_date).split("-")[0]}
              </p>
            </div>
          ) : null}

          {countries ? (
            <div className="movie-details__info">
              <h3 className="movie-details__tagline">Country</h3>
              <p className="movie-details__text">{countries}</p>
            </div>
          ) : null}

          <div className="movie-details__info">
            <h3 className="movie-details__tagline">Genres</h3>
            <p className="movie-details__text">{genresList}</p>
          </div>

          {tagline ? (
            <div className="movie-details__info">
              <h3 className="movie-details__tagline">Tag</h3>
              <p className="movie-details__text">{tagline}</p>
            </div>
          ) : null}

          <div className="movie-details__info">
            <h3 className="movie-details__tagline">Cast</h3>
            <p className="movie-details__text">{castList}</p>
          </div>

          <div className="movie-details__info">
            <h3 className="movie-details__tagline">Runtime</h3>
            <p className="movie-details__text">
              {episode_run_time || runtime} {" min"}
            </p>
          </div>

          <div className="movie-details__info">
            <h3 className="movie-details__tagline">Budget</h3>
            <p className="movie-details__text">{formatBudget}</p>
          </div>

          <h2 className="movie-details__subtitle">Overview</h2>
          <p className="movie-details__overview"> {overview} </p>

          <button className="movie-details__btn" onClick={handleFavorite}>
            <img src={isFav ? add : remove} alt="favorite" />
            {isFav ? "Delete from Favorite" : "Add to Favorite"}
          </button>
        </div>
      </div>
      <div className="movie-details__recomend">
        <h2 className="movie-details__headline">Recommendations</h2>
        {movieId ? <MoviesList movieId={id} grid={"list-movies--small"} /> : null}
      </div>
    </div>
  );
};
