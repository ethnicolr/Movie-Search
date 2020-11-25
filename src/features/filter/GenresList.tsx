import React, {useState, useEffect, ReactEventHandler} from 'react'
import { useDispatch, useSelector } from "react-redux";

import {getUrl} from '../../api/movieApi'
import {changeGenres} from './filterSlice';
import {RootState} from './../../app/store'
import {Genre, fetchGenres} from './filterSlice';

interface ListGenres {
  id: string
  name: string
}

export const GenresList = () => {
    const [data, setData] = React.useState<Genre[]>([])
    const dispatch = useDispatch();

    
    const genres = useSelector((state: RootState) => state.filter.genres);

    useEffect(() => {
      if (genres.length === 0){
        dispatch(fetchGenres());
      }
    //  const fetchData = async () => {
    //      let response = await fetch(getUrl['/genres']);
    //      let genres = await response.json();
    //      setData(genres.genres);
    //  }  
    //  fetchData();
    }, [])

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
        dispatch(changeGenres(e.currentTarget.name));
    }


    return (
        <div className="genres">
      <h3 className="genres__title">Genres</h3>
      <ul className="genres__list">
        {genres.length ? genres.map((genre) => {
          return (
           <li className="genres__item" key={genre.id}>
          <label className="genres__label">
            {genre.name}
            <input
              className="genres__checkbox"
              type="checkbox"
              onChange={handleChange}
              checked={genre.selected}
              name={genre.id}
            />
            <span className="genres__checkmark" />
          </label>
        </li>)
          
          }) : null}
      </ul>
    </div>
    )
}

export default GenresList;