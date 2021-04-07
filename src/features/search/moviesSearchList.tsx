import React from 'react'
import styled from 'styled-components'
import { MovieType } from '../../api/movieApi'
import { MoviesSearchItem } from './moviesSearchItem'

interface Props {
  movies: MovieType[]
}

const SearchItem = styled.li`
  border: 1px solid #2f2f2f;
  padding: 5px;
  &:hover {
    background-color: #494949;
  }
`

export const MoviesSearchList = React.memo(({ movies }: Props) => {
  return (
    <ul>
      {movies.map((movie: MovieType) => (
        <SearchItem key={movie.id}>
          <MoviesSearchItem movie={movie} />
        </SearchItem>
      ))}
    </ul>
  )
})

MoviesSearchList.displayName = 'MoviesSearchList'
