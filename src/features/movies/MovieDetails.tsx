import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useParams } from 'react-router-dom'
import { addFavorite, deleteFavorite } from './moviesSlice'
import { DetailsResult, gethDetails, MovieType } from '../../api/movieApi'
import { useFetch } from './../../hooks/useFetch'
import { RootState } from '../../app/store'
import { MoviesList } from './MoviesList'
import { Image } from '../../app/image'

import remove from './../../style/minus.svg'
import vote from './../../style/star.svg'
import add from './../../style/correct.svg'
import style from './movieDetails.module.css'

interface PropsParams {
  movieId: string
  media_type: string
}

export const MovieDetails = () => {
  const [data, setData] = React.useState<DetailsResult | null>(null)
  const [error, setError] = React.useState(null)
  const { movieId, media_type } = useParams<PropsParams>()
  const dispatch = useDispatch()

  const { data: similarMovie } = useFetch({ pathname: '/similar', movieId })

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await gethDetails(movieId)
        setData(data)
        setError(null)
      } catch (err) {
        setError(err)
      }
    }
    fetchData()
  }, [media_type, movieId])

  const favorite = useSelector((state: RootState) => state.movies.favorite)
  const isFav = favorite.some((favorite: MovieType) => {
    return favorite.id == movieId
  })

  if (error) {
    return <h2 className='movie-details__title'>{error}</h2>
  }

  if (!data) {
    return null
  }

  const {
    title,
    vote_average,
    poster_path,
    overview,
    tagline,
    release_date,
    first_air_date,
    genres = [],
    runtime,
    episode_run_time,
    name,
    id,
    production_countries = [],
    budget = 0,
  } = data.movieDetails

  const handleFavorite = () => {
    if (isFav) {
      dispatch(deleteFavorite(data.movieDetails.id))
    } else {
      dispatch(
        addFavorite({
          id,
          title,
          vote_average,
          poster_path,
          release_date,
          name,
          first_air_date,
          media_type,
        })
      )
    }
  }

  const genresList = genres.length
    ? genres.map((movie) => ` ${movie.name.toLowerCase()}`).join()
    : null
  const countries = production_countries.length
    ? production_countries.map((e) => ` ${e.name}`).join()
    : null
  const castList = data.cast
    ? data.cast
        .slice(0, 10)
        .map((item) => ` ${item.name}`)
        .join()
    : null
  const formatBudget = `$ ${budget
    .toString()
    .replace(/\B(?=(\d{3})+(?!\d))/g, '.')}`

  return (
    <div className={style.movieDetails}>
      <div className={style.container}>
        <div className={style.leftColumn}>
          <Image src={`https://image.tmdb.org/t/p/w500/${poster_path}`} />
        </div>
        <div className={style.rightColumn}>
          <div className={style.heading}>
            <h2 className={style.title}> {title || name} </h2>
            <span className={style.vote}>
              {`${vote_average} `}
              <img className={style.thumb} src={vote} alt='vote' />
            </span>
          </div>

          {release_date || first_air_date ? (
            <div className={style.info}>
              <h3 className={style.tagline}>Year</h3>
              <p className={style.text}>
                {(release_date || first_air_date).split('-')[0]}
              </p>
            </div>
          ) : null}

          {countries ? (
            <div className={style.info}>
              <h3 className={style.tagline}>Country</h3>
              <p className={style.text}>{countries}</p>
            </div>
          ) : null}

          <div className={style.info}>
            <h3 className={style.tagline}>Genres</h3>
            <p className={style.text}>{genresList}</p>
          </div>

          {tagline ? (
            <div className={style.info}>
              <h3 className={style.tagline}>Tag</h3>
              <p className={style.text}>{tagline}</p>
            </div>
          ) : null}

          <div className={style.info}>
            <h3 className={style.tagline}>Cast</h3>
            <p className={style.text}>{castList}</p>
          </div>

          <div className={style.info}>
            <h3 className={style.tagline}>Runtime</h3>
            <p className={style.text}>
              {episode_run_time || runtime} {' min'}
            </p>
          </div>

          <div className={style.info}>
            <h3 className={style.tagline}>Budget</h3>
            <p className={style.text}>{formatBudget}</p>
          </div>

          <h2 className={style.subtitle}>Overview</h2>
          <p className={style.overview}> {overview} </p>

          <button className={style.btn} onClick={handleFavorite}>
            <img src={isFav ? add : remove} alt='favorite' />
            {isFav ? 'Delete from Favorite' : 'Add to Favorite'}
          </button>
        </div>
      </div>
      <div className={style.recommend}>
        <h2 className={style.headline}>Recommendations</h2>
        {similarMovie ? (
          <MoviesList movies={similarMovie.moviesList} favorite={favorite} />
        ) : null}
      </div>
    </div>
  )
}
