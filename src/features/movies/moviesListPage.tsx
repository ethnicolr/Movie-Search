import React from 'react'
import { Status, MoviesResult } from '../../api/movieApi'
import { Pagination, OnPageChangeCallback } from './moviesPagination'
import { useSelector } from 'react-redux'
import { RootState } from '../../app/store'
import { MoviesList } from './MoviesList'
import { Spinner } from './../../app/Spinner'
import style from './moviesListPage.module.css'

interface Props {
  status: Status
  moviesData: MoviesResult | null
  onPageChange: OnPageChangeCallback
}

export const MoviesListPage = ({ status, moviesData, onPageChange }: Props) => {
  const favorite = useSelector((state: RootState) => state.movies.favorite)

  if (moviesData == null || status == 'fetching') {
    return (
      <div className={style.listMovies}>
        <Spinner />
      </div>
    )
  }

  if (status == 'fetched' && moviesData.moviesList.length == 0) {
    return (
      <div className={style.listMovies}>
        <h2>Not fount</h2>
      </div>
    )
  }

  const { moviesList, totalPages, page } = moviesData
  return (
    <div className={style.listMovies}>
      <MoviesList movies={moviesList} favorite={favorite} />
      <Pagination
        pageCount={totalPages}
        currentPage={page}
        onPageChange={onPageChange}
      />
    </div>
  )
}
