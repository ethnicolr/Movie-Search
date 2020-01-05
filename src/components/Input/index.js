import React, { useState, useEffect, useRef, useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory, useLocation } from "react-router-dom";
import { debounce } from "lodash";
import { fetchSearch, clearSearch } from "./../../actions";
import SearchList from "./../SearchList";
import seach from "./../../style/search.svg";
import cancel from './../../style/cancel.svg'
import "./style.scss";

const Input = ({ hidden, hidingElem }) => {

  const [value, setValue] = useState("");
  const [list, setList] = useState(false);

  const dispath = useDispatch();
  const history = useHistory();
  const location = useLocation();
  const wrapperRef = useRef(null);
  const inputEl = useRef(null);
  const searchList = useSelector(state => state.search.results);

  const handleChange = e => {
    let value = e.target.value;
    setValue(value);
    delay(value);
  };

  const delay = useCallback(
    debounce(value => {
      if (value.length) {
        dispath(
          fetchSearch({
            path: "/search",
            search: value
          })
        );
      } else {
        dispath(clearSearch());
      }
    }, 500),
    []
  );

  useEffect(() => {
    hidden ? inputEl.current.focus() : inputEl.current.blur();
  }, [hidden]);

  
  useEffect(() => {
    setList(true);
  }, [location.key]);

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  });

  const handleSubmit = e => {
    e.preventDefault();
    if (value.length) {
      history.push({
        pathname: "/search",
        search: value
      });
      document.body.style.overflow = "auto";
    }
  };

  const handleClickOutside = e => {
    if (wrapperRef.current && !wrapperRef.current.contains(e.target)) {
      setList(true);
    } else {
      setList(false);
    }
  };

  return (
    <>
      <div className="search" ref={wrapperRef}>
        <div
          className={
            hidden
              ? "search__container search__container--hidden"
              : "search__container"
          }
        >
          <form onSubmit={handleSubmit}>
            <input
              ref={inputEl}
              className="search__input"
              type="text"
              onChange={handleChange}
              placeholder="Seacrh movie..."
            />
            <button className="search__btn"><img src={seach} alt="seach" /></button>
          </form>
          <SearchList list={searchList} hidden={list} />
        </div>

        <button className="search__toggle search__toggle--hidden" onClick={() => hidingElem("search")}>
          <img src={hidden ? seach : cancel} alt="seach" />
        </button>
      </div>
    </>
  );
};


export default Input;
