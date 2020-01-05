import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchGenres, changeGenres } from "./../../actions";

import GenresList from "./../GenresList";

const LoadGenres = props => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchGenres());
  }, [dispatch]);

  const handleChange = genre => {
    dispatch(changeGenres(genre));
  };

  const genres = useSelector(state => state.filter.genres);
  return (
    <>
      <GenresList handleChange={handleChange} list={genres} />
    </>
  );
};


export default LoadGenres;
