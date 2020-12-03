import React, {useState, useEffect} from 'react'

import { MovieType } from '../../api/movieApi'
import {Movie} from './moviesListItem'
import style from './moviesList.module.css'

interface MoviesProp {
  movies: MovieType[]
  favorite: MovieType[]
}

export const MoviesList = ({ movies, favorite }: MoviesProp) => {
  return (
    <ul className={style.moviesList}>
      {movies.map((movie) => {
        const isFav = favorite.some((favorite) => favorite.id === movie.id)
        return (
          <li className={style.item} key={movie.id}>
            <Movie movieData={movie} isFav={isFav} />
          </li>
        )
      })}
    </ul>
  )
}

