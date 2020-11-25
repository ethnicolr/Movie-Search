import React from "react";
import Genres from "./GenresList";
import Sorting from "./Sorting";
import {MoviesList} from './../movies/MoviesList';
import "./style.scss";

export const Filter = () => {
  return (
    <div className="filter">
      <div className="filter__container filter__container--sr">
        <Sorting />
      </div>
      <div className="filter__container filter__container--gl">
        <Genres />
      </div>
      <div className="filter__container filter__container--ml">
      <MoviesList  grid={"medium"} />
        {/* <MoviesList location={{ pathname: "/filter" }} grid={"medium"} /> */}
      </div>
    </div>
  );
};

