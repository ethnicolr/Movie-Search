import React from 'react'
import { FilterGenres } from './filterGenres'
import { FilterSorting } from './filterSorting'
import {LoadFilterMovies} from '../movies/moviesLoadFilter'
import style from './filerPage.module.css'

export const FilterPage = () => {
  return (
    <div className={style.filter}>
      <div className={style.sort}>
        <FilterSorting />
      </div>
      <div className={style.genres}>
        <FilterGenres />
      </div>
      <div className={style.movies}>
        <LoadFilterMovies />
      </div>
    </div>
  )
}
