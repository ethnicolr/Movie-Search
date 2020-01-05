import React from "react";
import './style.scss';

const CastList = ({ cast }) => {
  return (
    <ul className="cast-list">
      {cast.slice(0, 16).map(item => (
        <li className="cast-list__item" key={item.id}> 
          <img
            src={`https://image.tmdb.org/t/p/w300/${item.profile_path}`}
            alt="cast"
          />
          <div className="desc">
            <span className="cast-list__text">{item.name}</span>
            <span className="cast-list__text">{item.character}</span>
          </div>
        </li>
      ))}
    </ul>
  );
};

export default CastList;
