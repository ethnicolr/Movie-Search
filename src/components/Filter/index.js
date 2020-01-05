import React from "react";
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
        <LoadMovies location={{ pathname: "/filter" }} size={"medium"}/>
      </div>
    </div>
  );
};


export default Filter;
