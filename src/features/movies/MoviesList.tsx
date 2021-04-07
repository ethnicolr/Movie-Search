import React from 'react'
import { MovieType } from '../../api/movieApi'
import { Movie } from './moviesListItem'
import { useAuth } from './../../context/authContext'
import { device } from './../../app/lib'
import styled from 'styled-components'

interface MoviesProp {
  movies: MovieType[]
}

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

export const MoviesList = ({ movies }: MoviesProp) => {
  const { favoriteList } = useAuth()
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
