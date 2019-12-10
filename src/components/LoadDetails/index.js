import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchDetails } from '../../actions';
import PropTypes from 'prop-types';

import MovieDetails from './../MovieDetails';

const LoadDetails = ({movieId}) => {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(fetchDetails(movieId));
  }, [movieId, dispatch]);

  const data = useSelector(state => state.movieDetails.movieData);
  const credits = useSelector(state => state.movieDetails.credits);

  return (
    <>
      <MovieDetails data={data} credits={credits} movieId={movieId}/>
    </>
  );
};

LoadDetails.propTypes = {};

export default LoadDetails;
