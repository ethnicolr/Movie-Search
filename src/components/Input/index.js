import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { debounce } from 'lodash';
import PropTypes from 'prop-types';

import { fetchSearch } from './../../actions';
import searchList from './../SearchList';
import './style.scss';
import SearchList from './../SearchList';

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

  const searchList = useSelector(state => state.search.results)


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
        />
      </form>
      <SearchList list={searchList}/>
    </div>
  );
};

Input.propTypes = {};

export default Input;
