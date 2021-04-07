import React from 'react'
import { Status, MoviesResult } from '../../api/movieApi'
import { Pagination, OnPageChangeCallback } from './moviesPagination'
import { MoviesList } from './MoviesList'
import { Spinner } from './../../app/Spinner'
import styled from 'styled-components'

const Container = styled.div`
  width: 80%;
  margin: 55px auto;
`
interface Props {
  status: Status
  moviesData: MoviesResult | null
  onPageChange: OnPageChangeCallback
}

export const MoviesListPage = ({ status, moviesData, onPageChange }: Props) => {
  if (moviesData == null || status == 'fetching') {
    return (
      <Container>
        <Spinner />
      </Container>
    )
  }

  if (status == 'fetched' && moviesData.moviesList.length == 0) {
    return (
      <Container>
        <h2>Not fount</h2>
      </Container>
    )
  }

  const { moviesList, totalPages, page } = moviesData
  return (
    <Container>
      <MoviesList movies={moviesList} />
      <Pagination
        pageCount={totalPages}
        currentPage={page}
        onPageChange={onPageChange}
      />
    </Container>
  )
}
