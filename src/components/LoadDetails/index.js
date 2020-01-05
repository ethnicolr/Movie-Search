import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams  } from "react-router-dom";
import { fetchDetails } from "../../actions";

import MovieDetails from "./../MovieDetails";

const LoadDetails = ({media_type}) => {
  const dispatch = useDispatch();
  const { movieId } = useParams();

  useEffect(() => {
    dispatch(fetchDetails(movieId, media_type));
  }, [movieId, media_type, dispatch]);

  const data = useSelector(state => state.movieDetails.movieData);
  const credits = useSelector(state => state.movieDetails.credits);
  const favorite = useSelector(state => state.favorite);
  return (
    <>
      <MovieDetails data={data} credits={credits} movieId={movieId} favorite={favorite}/>
    </>
  );
};


export default LoadDetails;
