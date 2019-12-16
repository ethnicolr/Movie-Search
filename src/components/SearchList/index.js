import React from "react";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";

import './style.scss'

const SearchList = ({ list, select, hidden }) => {
  return (
    <div className={hidden  ? "serach-list search-list--hidden " : "search-list"}>
      <ul className="search-list__items">
        {list.map((movie, index) => {
          const active = select === index ? "search-list__item--active" : "";
          return (
            <li className={`search-list__item ${active}`} key={movie.id}>
              <Link to={`/movie/${movie.id}`} className="search-list__link">
                <img
                  src={`https://image.tmdb.org/t/p/w300/${movie.poster_path}`}
                  alt="poster"
                  sizes={"40px"}
                />
                <h2 className="search-list__title">
                  {movie.title}
                  <span>{`(${movie.release_date.split(/\D/)[0]})`}</span>
                </h2>
                <span className="search-preview__vote">
                  {movie.vote_average.toFixed(1)}
                </span>
              </Link>
            </li>
          );
        })}
      </ul>
    </div>
  );
};

SearchList.propTypes = {};

export default SearchList;
