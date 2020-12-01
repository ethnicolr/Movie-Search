import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useLocation } from 'react-router-dom'

import { pathnameType } from '../../api/movieApi'
import { fetchMovies } from './moviesSlice'
import { RootState } from '../../app/store'
import ListMovies from './moviesList'
import Spinner from './../../app/Spinner'
import style from './moviesListPage.module.css'

interface ListProps {
  grid?: string
  movieId?: string
}

export const MoviesListPage = ({ movieId, grid = '' }: ListProps) => {
  const [page, setPage] = useState(0)

  const dispatch = useDispatch()
  const location = useLocation()

  const { genres, sortBy } = useSelector((state: RootState) => state.filter)
  const { moviesList, favorite, totalPages, moviesStatus } = useSelector(
    (state: RootState) => state.movies
  )
  const pathname = location.pathname as pathnameType
  const search = location.search

  useEffect(() => {
    if (pathname === '/favorite') return

    if (movieId) {
      dispatch(
        fetchMovies({
          pathname: '/similar',
          options: {
            search: movieId,
          },
        })
      )
      return
    }

    const selectedGenres = genres
      .filter((genre) => genre.selected)
      .map((genre) => genre.id)

    dispatch(
      fetchMovies({
        pathname,
        options: {
          search,
          genres: selectedGenres,
          sortBy,
          page: page + 1,
        },
      })
    )
  }, [pathname, sortBy, movieId, genres, page, search])

  useEffect(() => {
    setPage(0)
    window.scrollTo({
      top: 0,
      behavior: "smooth"
    })
  }, [location.key, sortBy, genres])

  const handleScroll = () => {
    if (
      window.innerHeight + document.documentElement.scrollTop !==
      document.documentElement.offsetHeight
    )
      return
    if (movieId) return
    console.log(totalPages);
    if (totalPages <= 1) return
    setPage((page) => page + 1)
  }

  useEffect(() => {
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [location.key, totalPages])

  let listMovie

  if (pathname === '/favorite') {
    listMovie = favorite
  } else {
    listMovie = moviesList
  }

  return (
    <div className={style.listMovies}>
      {listMovie.length === 0 && moviesStatus === 'succeeded' ? (
        <h1>Not found</h1>
      ) : (
        <ListMovies movies={listMovie} favorite={favorite} />
      )}

      {moviesStatus == 'pendiing' && <Spinner />}
    </div>
  )
}
