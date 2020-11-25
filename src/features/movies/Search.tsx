import React, { useState, useEffect, useRef, useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory, useLocation } from "react-router-dom";
import { debounce } from "lodash";

import {fetchSearch, clearSearch} from './moviesSlice'
import { SearchMovie } from "./SearchMovie";
import seach from "./../../style/search.svg";
import {RootState} from './../../app/store'
import {MovieType} from '../../api/movieApi'

const Search = () => {
  const [value, setValue] = useState("");
  const [isHidden, setHidden] = useState(false);

  const dispath = useDispatch();
  const history = useHistory();
  const location = useLocation();

  const wrapperRef = React.useRef<HTMLDivElement >(null!);
  const inputEl = React.useRef<HTMLInputElement>(null!);

  const moviesList = useSelector((state: RootState) => state.movies.searchList);
  const searchStatus = useSelector((state: RootState) => state.movies.searchStatus);
  

  const handleChange = (e: React.FormEvent<HTMLInputElement>): void => {
    let value = e.currentTarget.value;
    setValue(value);
    delay(value);
  };

  const delay = useCallback(
    debounce((value: string) => {
      if (value.length) {
        dispath(
            fetchSearch({
            pathname: "/search",
            options: {
              search: value
            }
          })
        );
      } else {
        dispath(clearSearch());
      }
    }, 500),
    []
  );

  useEffect(() => {
    setHidden(true);
  }, [location.key]);


  useEffect(() => {
    const handleClickOutside = (e: MouseEvent):void => {
      if (wrapperRef.current && !wrapperRef.current.contains(e.target as Node)) {
        setHidden(true);
      } else {
        setHidden(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  });

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>):void => {
    e.preventDefault();
    if (value.length) {
      history.push({
        pathname: "/search",
        search: value,
      });
      inputEl.current.blur();
      document.body.style.overflow = "auto";
    }
  };

  let previewList;

  if (moviesList.length ){
    previewList = moviesList.map((movie: MovieType) => {
      return (
        <li className="search-list__item" key={movie.id}>
          <SearchMovie data={movie}/>
        </li>
      )
    })
  } else if (moviesList.length === 0  && searchStatus === 'succeeded') {
    previewList = <h2>Not found</h2>
  }
  return (
    <>
      <div className="search" ref={wrapperRef}>
        <form onSubmit={handleSubmit}>
          <input
            ref={inputEl}
            className="search__input"
            type="text"
            value={value}
            onChange={handleChange}
            placeholder="Seacrh movie..."
          />
          <button className="search__btn">
            <img src={seach} alt="seach" />
          </button>
        </form>
        <div
      className={isHidden ? "serach-list search-list--hidden " : "search-list"}
     >
   
        <ul className="search-list__items">
        {previewList}
        </ul>
        </div>
      </div>
    </>
  );
};

export default Search