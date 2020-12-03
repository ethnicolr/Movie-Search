import React, { useState } from 'react'
import { useLocation } from 'react-router-dom'
import { useFetch } from '../../hooks/useFetch'
import { MoviesListPage } from './moviesListPage'
import { OnPageChangeCallback } from './moviesPagination'

export const moviesSearch = () => {
  const { search } = useLocation()
  const [page, setPage] = useState(1)

  const onPageChange: OnPageChangeCallback = (selectedItem) => {
    const newPage = selectedItem.selected + 1
    setPage(newPage)
  }

  const { status, data } = useFetch({ pathname: '/search', page, search })

  return (
    <MoviesListPage
      status={status}
      moviesData={data}
      onPageChange={onPageChange}
    />
  )
}
