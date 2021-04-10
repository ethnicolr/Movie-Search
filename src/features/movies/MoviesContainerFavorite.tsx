import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { RootState } from '../../app/store'
import { MoviesList } from './MoviesList'
import { useAuth } from '../../context/authContext'
import { getFavorite, MovieType } from '../../api/movieApi'
import { useAsync } from '../../hooks/useAsync'

export const MoviesContainerFavorite = () => {
  const { favoriteList } = useAuth()
  const { run, data } = useAsync<MovieType[]>()
  useEffect(() => {
    run(getFavorite(favoriteList))
  }, [])

  return <div>{data && <MoviesList movies={data} />}</div>
}
