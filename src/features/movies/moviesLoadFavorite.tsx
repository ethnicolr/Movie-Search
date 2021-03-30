import React from 'react'
import { useSelector } from 'react-redux'
import { RootState } from '../../app/store'
import { MoviesList } from './MoviesList'
import style from './moviesListPage.module.css'

export const moviesFavorite = () => {
  const movies = useSelector((state: RootState) => state.movies.favorite)

  return (
    <div className={style.listMovies}>
      <MoviesList movies={movies} favorite={movies} />
    </div>
  )
}
