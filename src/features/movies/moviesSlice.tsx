import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { MovieType } from './../../api/movieApi'
import { useAuth } from './../../context/authContext'

interface MovieState {
  favorite: MovieType[]
}

const favoriteList = window.localStorage.getItem('favorite')
  ? JSON.parse(window.localStorage.getItem('favorite') || '{}')
  : []

const initialState: MovieState = {
  favorite: favoriteList,
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
      window.localStorage.setItem('favorite', JSON.stringify(state.favorite))
    },
  },
})

export const { addFavorite, deleteFavorite } = moviesSlice.actions

export default moviesSlice.reducer
