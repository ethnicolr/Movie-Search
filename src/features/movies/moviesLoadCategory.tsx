import React, { useState } from 'react'
import { useLocation } from 'react-router-dom'
import { fetchMovieType } from '../../api/movieApi'
import { useFetch } from '../../hooks/useFetch'
import { MoviesListPage } from './moviesListPage'
import { OnPageChangeCallback } from './moviesPagination'

export const moviesCategory = () => {
  const location = useLocation()
  const pathname = location.pathname as fetchMovieType
  const [page, setPage] = useState(1)

  const onPageChange: OnPageChangeCallback = (selectedItem) => {
    const newPage = selectedItem.selected + 1
    setPage(newPage)
  }

  const { status, data } = useFetch({ pathname, page })

  return (
    <MoviesListPage
      status={status}
      moviesData={data}
      onPageChange={onPageChange}
    />
  )
}
