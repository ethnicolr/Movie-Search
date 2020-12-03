import { configureStore } from '@reduxjs/toolkit'

import moviesReducer from './../features/movies/moviesSlice'
import filterReducer from './../features/filter/filterSlice'

const store = configureStore({
  reducer: {
    movies: moviesReducer,
    filter: filterReducer
  },
})

export type RootState = ReturnType<typeof store.getState>

export default store
