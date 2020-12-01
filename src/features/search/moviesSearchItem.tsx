import React from 'react'
import { Link } from 'react-router-dom'
import { MovieType } from '../../api/movieApi'
import {Image} from '../../app/image'
import star from './../../style/star.svg'
import style from './moviesSearchItem.module.css'

type Props = { movie: MovieType }

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
  const link = media_type ? media_type : 'movie'
  return (
    <Link to={`/${link}/${id}`} className={style.item}>
      <Image
        src={`https://image.tmdb.org/t/p/w300/${poster_path}`}
        size={'40px'}
      />
      <h2 className={style.title}>
        {`${title || name} ${
          release_date || first_air_date
            ? `(${(release_date || first_air_date).split(/-/)[0]})`
            : null
        }`}
      </h2>
      <span className={style.vote}>
        {vote_average ? vote_average.toFixed(1) : 0}
        <img className={style.thumb} src={star} alt='vote' />
      </span>
    </Link>
  )
}
