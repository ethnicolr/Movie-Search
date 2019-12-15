import React, { useState, useEffect, useRef, useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import { debounce } from "lodash";
import PropTypes from "prop-types";

import { fetchSearch, clearSearch } from "./../../actions";
import SearchList from "./../SearchList";
import "./style.scss";

const Input = ({ hidden }) => {
  const [value, setValue] = useState("");

  const dispath = useDispatch();
  let history = useHistory();

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

  const searchList = useSelector(state => state.search.results);

  useEffect(() => {
    !hidden ? inputEl.current.focus() : inputEl.current.blur();
  }, [hidden]);

  const inputEl = useRef(null);

  const handleSubmit = e => {
    e.preventDefault();
    if (value.length) {
      history.push({ pathname: "/search", search: value });
      document.body.style.overflow = "auto";
    }
  };

  return (
    <>
      <div className={hidden ? "search--hidden" : "search"}>
        <div className="search__container">
          <form onSubmit={handleSubmit}>
            <input
              ref={inputEl}
              className="search__input"
              type="text"
              onChange={handleChange}
            />
          </form>
          <SearchList list={searchList} />
        </div>
      </div>
    </>
  );
};

Input.propTypes = {};

export default Input;
