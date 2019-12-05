import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchDetails } from '../../actions';
import PropTypes from 'prop-types';

import MovieDetails from './../MovieDetails';

const LoadDetails = props => {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(fetchDetails(props.movieId));
  }, []);

  const data = useSelector(state => state.movieDetails.movieData);

  return (
    <>
      <MovieDetails data={data} />
    </>
  );
};

LoadDetails.propTypes = {};

export default LoadDetails;
