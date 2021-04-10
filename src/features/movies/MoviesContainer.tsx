import React, { useState, useEffect } from 'react'
import { useLocation } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { RootState } from '../../app/store'

import {
  pathnameType,
  MoviesResult,
  getMovies,
  getFavorite,
  MovieType,
  Options,
} from '../../api/movieApi'
import { useAsync } from '../../hooks/useAsync'
import { useFetch } from '../../hooks/useFetch'
import { MoviesListPage } from './moviesListPage'
import { OnPageChangeCallback } from './moviesPagination'
import { useAuth } from '../../context/authContext'
import { MoviesList } from './MoviesList'
import { usePrevious } from '../../hooks/usePrevious'
import { isEqual } from 'lodash'

export function MoviesContainer(): JSX.Element {
  const location = useLocation()
  const { genres, sortBy } = useSelector((state: RootState) => state.filter)
  const { search } = useLocation()

  const pathname = location.pathname as pathnameType
  const [page, setPage] = useState(1)
  const onPageChange: OnPageChangeCallback = (selectedItem) => {
    const newPage = selectedItem.selected + 1
    setPage(newPage)
  }
  const options: Options = { pathname, page }

  if (pathname === '/filter') {
    const selectedGenres = genres
      .filter((genre) => genre.selected)
      .map((genre) => genre.id)

    options.sortBy = sortBy
    options.genres = selectedGenres
  } else if (pathname === '/search') {
    options.search = search
  }
  const { run, status, data } = useAsync<MoviesResult | MovieType[]>()

  const previousOptions = usePrevious(options)
  useEffect(() => {
    if (!options) return
    if (isEqual(previousOptions, options)) return
    run(getMovies(options))
  }, [options])

  return (
    <MoviesListPage
      status={status}
      moviesData={data as MoviesResult}
      onPageChange={onPageChange}
    />
  )
}
