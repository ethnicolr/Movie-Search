import React, { useState, useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import { debounce } from "lodash";
import PropTypes from "prop-types";

import { fetchSearch } from "./../../actions";
import SearchList from "./../SearchList";
import "./style.scss";

const Input = ({ hidden }) => {
  const [value, setValue] = useState("");
  
  const dispath = useDispatch();
  let history = useHistory();

  const handleChange = value => {
    if (value.length) {
      setValue(value);
    }
  };

  const delayFetch = debounce(value => {
    if (value.length > 2) {
      dispath(
        fetchSearch({
          path: "/search",
          search: value
        })
      );
    }
  }, 1000);

  const searchList = useSelector(state => state.search.results);

  useEffect(() => {
    !hidden ? inputEl.current.focus() : inputEl.current.blur();
  }, [hidden]);

  const inputEl = useRef(null);

  const handleSubmit = e => {
    e.preventDefault();
    history.push({ pathname: "/search", search: value });
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
              onChange={e => {
                handleChange(e.target.value);
                delayFetch(e.target.value);
              }}
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
