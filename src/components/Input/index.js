import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { debounce } from 'lodash';
import PropTypes from 'prop-types';

import { fetchSearch } from './../../actions';
import './style.scss';

const Input = props => {
  const [value, setValue] = useState("");
  const dispath = useDispatch();

  const handleChange = value => {
    if (value.length) {
      setValue(value);
    }
  };

  const delayFetch = debounce(value => {
    console.log("test");
    if (value.length > 2) {
      dispath(
        fetchSearch({
          pathname: "/search",
          search: value
        })
      );
    }
  }, 1000);

  return (
    <div className="search">
      <form>
        <input
          className="search__input"
          type="text"
          placeholder="Search movies..."
          onChange={e => {
            handleChange(e.target.value);
            delayFetch(e.target.value);
          }}
        />{" "}
      </form>{" "}
    </div>
  );
};

Input.propTypes = {};

export default Input;
