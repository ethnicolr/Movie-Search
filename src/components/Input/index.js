import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { withRouter } from "react-router";
import { debounce } from 'lodash';
import PropTypes from 'prop-types';

import { fetchSearch } from './../../actions';
import SearchList from './../SearchList';
import './style.scss';

const Input = props => {
  const [value, setValue] = useState("");
  const [list, setList] = useState([]);
  const [select, setSelect] = useState(0);
  const [selected, setSelected] = useState(0);

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
          path: "/search",
          search: value
        })
      );
    }
  }, 1000);

  const searchList = useSelector(state => state.search.results);

  useEffect(() => {
    setList(searchList);
  }, [searchList])

  const handleKeyDown = e => {
    if (searchList.length) {
      switch (e.keyCode) {
        case 38:{
          setSelected(true);
          if (select === 0){
            setSelect(list.length - 1);
          }else {
            setSelect(select - 1)
          }
          break;
        }

        case 40: {
          setSelected(true);
          if (select === list.length - 1){
            setSelect(0)
          } else {
            setSelect(select + 1)
          }
          break;
        }
          
        default:
          break;
      }
    }
  }

  const handleSubmit = e => {
    e.preventDefault();
    if (selected){
      let movie = list[select].id
      props.history.push(`/movie/${movie}`)
      
    } else {
      props.history.push({pathname: "/search", search: value})
    }
  }

  return (
    <div className="search">
      <form onSubmit={handleSubmit}>
        <input
          className="search__input"
          type="text"
          placeholder="Search movies..."
          onChange={e => {
            handleChange(e.target.value);
            delayFetch(e.target.value);
          }}
          onKeyDown={handleKeyDown}
        />
      </form>
      <SearchList list={searchList} select={select}/>
    </div>
  );
};

Input.propTypes = {};

export default withRouter(Input);
