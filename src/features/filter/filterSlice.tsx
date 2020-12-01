import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit'

import { gethGenres, Genre } from './../../api/movieApi'

interface FilterState {
  genres: Genre[]
  sortBy: string
}

const initialState: FilterState = {
  genres: [],
  sortBy: 'popularity.desc',
}

export const fetchGenres = createAsyncThunk('filter/fetchGenres', async () => {
  const { genres } = await gethGenres()
  return genres
})

const filterSlice = createSlice({
  name: 'filtet',
  initialState,
  reducers: {
    changeGenres(state, action: PayloadAction<string>): void {
      const genre = state.genres.find((genre) => {
        return genre.id == action.payload
      })
      if (genre) {
        genre.selected = !genre.selected
      }
    },
    sortBy(state, action) {
      state.sortBy =
        state.sortBy === `${action.payload}.desc`
          ? `${action.payload}.asc`
          : `${action.payload}.desc`
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchGenres.fulfilled, (state, action) => {
      state.genres = action.payload.map((genre) => ({
        ...genre,
        selected: false,
      }))
    })
  },
})

export const { changeGenres, sortBy } = filterSlice.actions

export default filterSlice.reducer
