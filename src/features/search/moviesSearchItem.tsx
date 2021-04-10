import React from 'react'
import { Link } from 'react-router-dom'
import styled from 'styled-components'
import { MovieType } from '../../api/movieApi'
import { Image } from './../../app/Image'

import star from './../../style/star.svg'

type Props = { movie: MovieType }

const Item = styled(Link)`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding-right: 20px;
  color: #fff;
`

const Title = styled.h2`
  font-size: 19px;
  font-weight: 400;
`

const Vote = styled.span`
  font-size: 19px;
`

const Thumb = styled.img`
  width: 12px;
  margin-left: 5px;
`

export const MoviesSearchItem = ({ movie }: Props) => {
  const {
    title,
    name,
    release_date,
    first_air_date,
    poster_path,
    id,
    vote_average,
    media_type,
  } = movie

  const titleValue = title || name
  const dateValue =
    release_date || first_air_date
      ? `(${(release_date || first_air_date).split(/-/)[0]})`
      : null

  const vote = vote_average ? vote_average.toFixed(1) : 0
  const heading = `${titleValue} ${dateValue}`
  const link = `/${media_type ? media_type : 'movie'}/${id}`

  const poster = `https://image.tmdb.org/t/p/w300/${poster_path}`
  return (
    <Item to={link}>
      <Image src={poster} size={'50px'} />
      <Title>{heading}</Title>
      <Vote>
        {vote}
        <Thumb src={star} alt='vote' />
      </Vote>
    </Item>
  )
}
