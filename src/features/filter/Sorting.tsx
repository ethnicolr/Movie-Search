import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { sortBy } from "./filterSlice";
import "./style.scss";

interface RootState {
  filter: {
    sortBy: string
  }
}

const Sorting = () => {
  const dispatch = useDispatch();

  const handleSort = (e: React.MouseEvent<HTMLButtonElement>) => {
    dispatch(sortBy(e.currentTarget.name))
  };

  

  const active = useSelector((state: RootState ) => state.filter.sortBy);

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
            onClick={handleSort}
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
            onClick={handleSort}
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
            onClick={handleSort}
          >
            rating
          </button>
        </li>
      </ul>
    </div>
  );
};

export default Sorting;
