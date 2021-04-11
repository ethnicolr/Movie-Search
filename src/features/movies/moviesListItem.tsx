import React from 'react'
import { Link } from 'react-router-dom'
import { Image } from '../../app/Image'
import { MovieType } from '../../api/movieApi'
import { useAuth } from '../../context/authContext'
import { Title, Thumb } from '../../app/lib'
import star from './../../style/star.svg'
import add from './../../style/correct.svg'
import remove from './../../style/minus.svg'
import styled from 'styled-components'

type PropMovie = {
  movieData: MovieType
  isFav: boolean
}

const MovieContainer = styled.div`
  position: relative;
  z-index: 5;
  height: 100%;
  text-align: center;
  background-color: #0b0b0b;
  color: #fff;
  padding-bottom: 10px;
  font-weight: 600;
  box-shadow: 2px 0px 5px 2px rgba(0, 0, 0, 0.75);
  border-radius: 0 0 5px 5px;
`

type ContainerProps = {
  border?: boolean
}
const Container = styled.div<ContainerProps>`
  display: flex;
  justify-content: space-between;
  padding: 5px 0;
  ${(props) =>
    props.border ? 'border-bottom: 1px solid rgb(80, 80, 80);' : ''}
`

const Button = styled.button`
  position: absolute;
  z-index: 40;
  width: 32px;
  height: 32px;
  top: 10px;
  right: -10px;
  background-color: transparent;
  border: none;
  cursor: pointer;
  outline: none;
  border: 1px solid #3c4043;
  background-color: #212121;
`

const ContainerDesc = styled.div`
  padding: 10px 12px 0 12px;
`

const ContainerImg = styled.div`
  height: 315px;
`

export const Movie = React.memo(({ movieData, isFav }: PropMovie) => {
  const {
    title,
    vote_average = 0,
    poster_path,
    release_date,
    first_air_date,
    name,
    media_type,
    id,
  } = movieData
  const {
    currentUser,
    handleLoginModal,
    addToStorage,
    deleteFromStorage,
  } = useAuth()

  const handleFavorite = () => {
    if (!currentUser) {
      handleLoginModal(true)
      return
    }
    isFav ? deleteFromStorage(movieData.id) : addToStorage(movieData.id)
  }

  const titleValue = title || name
  const dateValue =
    release_date || first_air_date
      ? (release_date || first_air_date).split(/-/)[0]
      : null

  const link = `/${media_type ? media_type : 'movie'}/${id}`
  return (
    <MovieContainer>
      <ContainerImg>
        <Link to={link}>
          <Image src={`https://image.tmdb.org/t/p/w300/${poster_path}`} />
        </Link>
      </ContainerImg>

      <ContainerDesc>
        <Link to={`/${media_type}/${id}`}>
          <Title>{titleValue}</Title>
        </Link>
        <Container border>
          <Title>Age: </Title>
          <Title>{dateValue}</Title>
        </Container>

        <Container>
          <Title>Rating</Title>
          <Title>
            {vote_average}
            <Thumb width={'10px'} src={star} alt='vote' />
          </Title>
        </Container>
      </ContainerDesc>
      <Button onClick={handleFavorite}>
        <img src={isFav ? add : remove} alt='add' />
      </Button>
    </MovieContainer>
  )
})

Movie.displayName = 'Moviu'
