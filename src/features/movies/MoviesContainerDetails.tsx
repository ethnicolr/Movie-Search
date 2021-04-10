import React, { useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { useAuth } from './../../context/authContext'
import { useLocation } from 'react-router-dom'
import { MovieDetails } from './MovieD'
import { useAsync } from '../../hooks/useAsync'
import {
  DetailsResult,
  getDetails,
  getMovies,
  MoviesResult,
} from '../../api/movieApi'

interface PropsParams {
  movieId: string
  media_type: string
}

export const MovieContainerDetails = () => {
  const { movieId, media_type } = useParams<PropsParams>()
  console.log(media_type)
  const location = useLocation()

  const { data: dataDetails, run: fetchDetails } = useAsync<DetailsResult>()
  const { data: dataSimilar, run: fetchSimilar } = useAsync<MoviesResult>()

  useEffect(() => {
    window.scrollTo(0, 0)
  }, [location.key])

  useEffect(() => {
    fetchSimilar(getMovies({ pathname: '/similar', movieId }))
    fetchDetails(getDetails(movieId))
  }, [movieId])
  const {
    currentUser,
    handleLoginModal,
    addToStorage,
    deleteFromStorage,
    favoriteList,
  } = useAuth()

  const isFavorite = favoriteList.some((id) => id == movieId)

  //   if (error) {
  //     return <h2 className='movie-details__title'>{error}</h2>
  //   }

  const handleFavorite = (id: string) => {
    if (!currentUser) {
      handleLoginModal(true)
      return
    }
    isFavorite ? deleteFromStorage(id) : addToStorage(id)
  }

  return (
    dataDetails &&
    dataSimilar && (
      <MovieDetails
        onFavorite={handleFavorite}
        isFavorite={isFavorite}
        data={dataDetails}
        similarMovie={dataSimilar.moviesList}
      />
    )
  )
}
