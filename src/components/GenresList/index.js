import React from "react";
import './style.scss';

const GenresList = ({ list, handleChange }) => {
  return (
    <div className="genres">
      <h3 className="genres__title">Genres</h3>
        <ul className="genres__list">
          {list.map(genre => (
            <li className="genres__item" key={genre.id}>
              <label className="genres__label">
                {genre.name}
                <input
                  className="genres__checkbox"
                  onChange={e => handleChange(e.target.name)}
                  type="checkbox"
                  name={genre.id}
                />
                <span className="genres__checkmark" />
              </label>
            </li>
          ))}
        </ul>
    </div>
  );
};


export default GenresList;
