import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { changeGenres } from './filterSlice'
import { RootState } from '../../app/store'
import { fetchGenres } from './filterSlice'

import style from './filterGenres.module.css'

export const FilterGenres = () => {
  const dispatch = useDispatch()
  const genres = useSelector((state: RootState) => state.filter.genres)
  useEffect(() => {
    if (genres.length === 0) {
      dispatch(fetchGenres())
    }
  }, [])

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
    dispatch(changeGenres(e.currentTarget.name))
  }

  return (
    <div className={style.genres}>
      <h3 className={style.title}>Genres</h3>
      <ul className={style.list}>
        {genres.length
          ? genres.map((genre) => {
              return (
                <li className={style.item} key={genre.id}>
                  <label className={style.label}>
                    {genre.name}
                    <input
                      type='checkbox'
                      onChange={handleChange}
                      checked={genre.selected}
                      name={genre.id}
                    />
                    <span className={style.checkmark} />
                  </label>
                </li>
              )
            })
          : null}
      </ul>
    </div>
  )
}
