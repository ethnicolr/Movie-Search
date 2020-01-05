import React from "react";
import { Link } from "react-router-dom";
import Image from "./../Image";
import "./style.scss";

const SearchList = ({ list, hidden }) => {
  return (
    <div
      className={hidden ? "serach-list search-list--hidden " : "search-list"}
    >
      <ul className="search-list__items">
        {list.map((movie) => {
          const {
            title,
            name,
            release_date,
            first_air_date,
            poster_path,
            id,
            vote_average,
            media_type
          } = movie;
          const link = media_type ? media_type : "movie";
          return (
            <li className="search-list__item" key={id}>
              <Link to={`/${link}/${id}`} className="search-list__link">
                <Image
                  src={`https://image.tmdb.org/t/p/w300/${poster_path}`}
                  size={"50px"}
                />
                <h2 className="search-list__title">
                  {title || name}
                  <span className="_text">
                    {release_date || first_air_date
                      ? (release_date || first_air_date).split(/-/)[0]
                      : null}
                  </span>
                </h2>
                <span className="search-preview__vote">
                  {vote_average ? vote_average.toFixed(1) : 0}
                </span>
              </Link>
            </li>
          );
        })}
      </ul>
    </div>
  );
};

export default SearchList;
