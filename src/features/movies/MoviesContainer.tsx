import React, { useState, useEffect } from 'react'
import { useSelector } from 'react-redux'
import { useLocation } from 'react-router-dom'
import { usePrevious } from '../../hooks/usePrevious'
import { useAsync } from '../../hooks/useAsync'
import { useAuth } from '../../context/authContext'
import { isEqual } from 'lodash'
import { RootState } from '../../app/store'
import { Pagination, OnPageChangeCallback } from './moviesPagination'
import { MoviesList } from './MoviesList'
import styled from 'styled-components'
import {
  pathnameType,
  MoviesResult,
  getMovies,
  Options,
} from '../../api/movieApi'

const Container = styled.div`
  width: 80%;
  margin: 55px auto;
`

export function MoviesContainer(): JSX.Element {
  const location = useLocation()
  const { genres, sortBy } = useSelector((state: RootState) => state.filter)
  const { search } = useLocation()
  const { favoriteList } = useAuth()

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
  const { run, status, data } = useAsync<MoviesResult>()

  const previousOptions = usePrevious(options)
  useEffect(() => {
    if (!options) return
    if (isEqual(previousOptions, options)) return
    run(getMovies(options))
  }, [options])

  return (
    <Container>
      <MoviesList
        status={status}
        movies={data?.moviesList || []}
        favoriteList={favoriteList}
      />
      {data && Boolean(data.totalPages) && (
        <Pagination
          pageCount={data.totalPages}
          currentPage={page}
          onPageChange={onPageChange}
        />
      )}
    </Container>
  )
}
