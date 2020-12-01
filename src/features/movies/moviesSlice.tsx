import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit'
import {
  fetchMovieType,
  getMovies,
  Options,
  MoviesResult,
  MovieType,
} from './../../api/movieApi'

interface fetchProps {
  pathname: fetchMovieType
  options: Options
}

export const fetchMovies = createAsyncThunk(
  'movies/fetchMovies',
  async (props: fetchProps) => {
    const { pathname, options } = props
    const moviesSearch = await getMovies(pathname, options)
    return moviesSearch
  }
)

interface MovieState {
  moviesList: MovieType[]
  moviesStatus: 'indle' | 'pendiing' | 'succeeded' | 'failed'
  totalPages: number
  favorite: MovieType[]
  error: null | string
}

const favoriteList = window.localStorage.getItem('favorite')
  ? JSON.parse(window.localStorage.getItem('favorite') || '{}')
  : []

const initialState: MovieState = {
  moviesList: [],
  moviesStatus: 'indle',
  totalPages: 0,
  favorite: favoriteList,
  error: null,
}

const moviesSlice = createSlice({
  name: 'movies',
  initialState,
  reducers: {
    addFavorite: (state, action: PayloadAction<MovieType>) => {
      state.favorite.push(action.payload)
      window.localStorage.setItem('favorite', JSON.stringify(state.favorite))
    },
    deleteFavorite: (state, action: PayloadAction<string>) => {
      state.favorite = state.favorite.filter(
        (movie: MovieType) => movie.id !== action.payload
      )
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchMovies.pending, (state) => {
      state.moviesStatus = 'pendiing'
    })

    builder.addCase(fetchMovies.fulfilled, (state, action) => {
      const { moviesList, totalPages, page } = action.payload
      state.moviesStatus = 'succeeded'
      state.totalPages = totalPages
      if (page > 1) {
        state.moviesList.push(...moviesList)
      } else {
        state.moviesList = moviesList
      }
    })

    builder.addCase(fetchMovies.rejected, (state) => {
      state.moviesStatus = 'failed'
    })
  },
})

export const { addFavorite, deleteFavorite } = moviesSlice.actions

export default moviesSlice.reducer
