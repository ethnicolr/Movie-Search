import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { sortBy } from './filterSlice'
import { RootState } from './../../app/store'
import style from './filterSorting.module.css'

export const FilterSorting = () => {
  const dispatch = useDispatch()
  const active = useSelector((state: RootState) => state.filter.sortBy)

  const handleSort = (e: React.MouseEvent<HTMLButtonElement>) => {
    dispatch(sortBy(e.currentTarget.name))
  }

  const sortActivity = (field: string) => {
    return active === `${field}.desc`
      ? `${style.sortBtn} ${style.desc}`
      : `${style.sortBtn} ${style.asc}`
  }

  return (
    <div className={style.sort}>
      <h3 className={style.title}>Sort by</h3>
      <ul className={style.items}>
        <li className={style.item}>
          <button
            className={sortActivity('popularity')}
            name='popularity'
            onClick={handleSort}
          >
            popularity
          </button>
        </li>
        <li className={style.item}>
          <button
            className={sortActivity('release_date')}
            name='release_date'
            onClick={handleSort}
          >
            date
          </button>
        </li>
        <li className={style.item}>
          <button
            className={sortActivity('vote_average')}
            name='vote_average'
            onClick={handleSort}
          >
            rating
          </button>
        </li>
      </ul>
    </div>
  )
}
