import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { sortBy } from "./../../actions";
import PropTypes from "prop-types";

import "./style.scss";

const Sorting = props => {
  const dispatch = useDispatch();

  const handleSort = value => {
    dispatch(sortBy(value));
  };

  const active = useSelector(state => state.filter.sortBy);

  return (
    <div className="sort">
      <h3 className="sort__title">Sort by</h3>
      <ul className="sort__items">
        <li className="sort__item">
          <button
            className={
              active === "popularity.desc"
                ? "sort-btn sort-btn--desc"
                : "sort-btn sort-btn--asc"
            }
            name="popularity"
            onClick={e => handleSort(e.target.name)}
          >
            popularity
          </button>
        </li>
        <li className="sort__item">
          <button
            className={
              active === "release_date.desc"
                ? "sort-btn sort-btn--desc"
                : "sort-btn sort-btn--asc"
            }
            name="release_date"
            onClick={e => handleSort(e.target.name)}
          >
            date
          </button>
        </li>
        <li className="sort__item">
          <button
            className={
              active === "vote_average.desc"
                ? "sort-btn sort-btn--desc"
                : "sort-btn sort-btn--asc"
            }
            name="vote_average"
            onClick={e => handleSort(e.target.name)}
          >
            rating
          </button>
        </li>
      </ul>
    </div>
  );
};

Sorting.propTypes = {};

export default Sorting;
