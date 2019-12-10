import React from "react";
import PropTypes from "prop-types";
import Genres from "./../LoadGenres";
import Sorting from "./../Sorting";
import LoadMovies from "./../LoadMovies";

import "./style.scss";

const Filter = props => {
  return (
    <div className="filter">
      
      <div className="filter__container filter__container--sr">
        <Sorting />
      </div>
      <div className="filter__container filter__container--gl">
        <Genres />
      </div>
      <div className="filter__container filter__container--ml">
        <LoadMovies location={{ pathname: "/filter" }} />
      </div>
    </div>
  );
};

Filter.propTypes = {};

export default Filter;
