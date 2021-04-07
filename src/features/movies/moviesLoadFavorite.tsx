import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { RootState } from '../../app/store'
import { MoviesList } from './MoviesList'
import { useAuth } from './../../context/authContext'
import { getFavorite, MovieType } from './../../api/movieApi'

export const moviesFavorite = () => {
  const [movies, setMovies] = useState<MovieType[]>([])
  // const movies = useSelector((state: RootState) => state.movies.favorite)
  const { favoriteList } = useAuth()

  useEffect(() => {
    const fetchApi = async () => {
      const favorite = await getFavorite(favoriteList)
      setMovies(favorite)
    }
    fetchApi()
  }, [])

  return (
    <div>
      <h1>Test</h1>
      <MoviesList movies={movies} />
    </div>
  )
}
