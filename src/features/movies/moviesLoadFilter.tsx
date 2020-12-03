import React, { useState } from 'react'
import { useSelector } from 'react-redux'
import { RootState } from '../../app/store'
import { useFetch } from '../../hooks/useFetch'
import { MoviesListPage } from './moviesListPage'
import { OnPageChangeCallback } from './moviesPagination'

export const LoadFilterMovies = () => {
  const [page, setPage] = useState(1)
  const { genres, sortBy } = useSelector((state: RootState) => state.filter)

  const selectedGenres = genres
    .filter((genre) => genre.selected)
    .map((genre) => genre.id)

  const onPageChange: OnPageChangeCallback = (selectedItem) => {
    const newPage = selectedItem.selected + 1
    setPage(newPage)
  }

  const { status, data } = useFetch({
    pathname: '/filter',
    sortBy,
    genres: selectedGenres,
    page,
  })

  return (
    <MoviesListPage
      status={status}
      moviesData={data}
      onPageChange={onPageChange}
    />
  )
}
