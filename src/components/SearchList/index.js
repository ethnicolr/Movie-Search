import React from "react";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";

import './style.scss'

const SearchList = ({ list, select, hidden }) => {
  
  return (
    <div className={hidden ? "serach-list search-list--hidden " : "search-list"}>
      <ul className="search-list__items">
        {list.map((movie, index) => {
          const active = select === index ? "search-list__item--active" : "";
          const { title, name, release_date, first_air_date, poster_path, id, vote_average } = movie;
          return (
            <li className={`search-list__item ${active}`} key={id}>
              <Link to={`/${id}`} className="search-list__link">
                <img
                  src={`https://image.tmdb.org/t/p/w300/${poster_path}`}
                  alt="poster"
                  sizes={"40px"}
                />
                <h2 className="search-list__title">
                  {title || name}{` `}
                  <span className="_text">{release_date || first_air_date ? (release_date || first_air_date).split(/-/)[0] : null}</span>
                </h2>
                <span className="search-preview__vote">
                  {vote_average.toFixed(1)}
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
