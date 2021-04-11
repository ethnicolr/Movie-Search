import React, { useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { useAuth } from './../../context/authContext'
import { useLocation } from 'react-router-dom'
import { MovieDetails } from './MovieDetails'
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

export const MovieContainerDetails = (): JSX.Element | null => {
  const { movieId, media_type } = useParams<PropsParams>()
  const location = useLocation()
  const {
    currentUser,
    handleLoginModal,
    addToStorage,
    deleteFromStorage,
    favoriteList,
  } = useAuth()
  const {
    data: dataDetails,
    run: fetchDetails,
    status: statusDetails,
  } = useAsync<DetailsResult>()
  const {
    data: dataSimilar,
    run: fetchSimilar,
    status: statusSimilar,
  } = useAsync<MoviesResult>()

  useEffect(() => {
    window.scrollTo(0, 0)
  }, [location.key])

  useEffect(() => {
    fetchSimilar(
      getMovies({ pathname: '/similar', movieId, mediaType: media_type })
    )
    fetchDetails(getDetails(movieId, media_type))
  }, [movieId])

  const isFavorite = favoriteList.some((id) => id == movieId)

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
        data={dataDetails}
        onFavorite={handleFavorite}
        isFavorite={isFavorite}
        similarMovie={dataSimilar.moviesList}
        statusSimilar={statusSimilar}
        favoriteList={favoriteList}
      />
    )
  )
}
