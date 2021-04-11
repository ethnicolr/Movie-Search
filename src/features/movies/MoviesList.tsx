import React from 'react'
import { MovieType } from '../../api/movieApi'
import { Spinner } from '../../app/Spinner'
import { device } from '../../app/lib'
import { Movie } from './moviesListItem'
import styled from 'styled-components'

const ListItems = styled.ul`
  position: relative;
  flex-wrap: wrap;
  display: flex;
  justify-content: center;
`

const Item = styled.li`
  width: 210px;
  max-height: 480px;
  margin-right: 35px;
  margin-bottom: 45px;
  @media ${device.mobileM} {
    margin-right: 0;
  }
`
interface Props {
  status: string
  movies: MovieType[]
  favoriteList: string[]
}

export const MoviesList = ({
  status,
  movies,
  favoriteList,
}: Props): JSX.Element => {
  console.log(status)
  if (status === 'pending') {
    return <Spinner />
  }

  if (status == 'resolved' && movies.length == 0) {
    return <h2>Not found</h2>
  }

  return (
    <ListItems>
      {movies.map((movie) => {
        const isFav = favoriteList.some((id) => id === movie.id)
        return (
          <Item key={movie.id}>
            <Movie movieData={movie} isFav={isFav} />
          </Item>
        )
      })}
    </ListItems>
  )
}
