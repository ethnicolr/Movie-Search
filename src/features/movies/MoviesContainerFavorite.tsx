import React, { useEffect } from 'react'
import { useAuth } from '../../context/authContext'
import { useAsync } from '../../hooks/useAsync'
import { getFavorite, MovieType } from '../../api/movieApi'
import { MoviesList } from './MoviesList'
import styled from 'styled-components'

const Container = styled.div`
  width: 80%;
  margin: 55px auto;
`
export function MoviesContainerFavorite(): JSX.Element {
  const { favoriteList } = useAuth()
  const { run, data, status } = useAsync<MovieType[]>()
  useEffect(() => {
    run(getFavorite(favoriteList))
  }, [])

  return (
    <Container>
      {data && (
        <MoviesList movies={data} status={status} favoriteList={favoriteList} />
      )}
    </Container>
  )
}
