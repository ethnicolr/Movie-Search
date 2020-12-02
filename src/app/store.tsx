import { configureStore } from '@reduxjs/toolkit'

import moviesReducer from './../features/movies/moviesSlice'
import filterReducer from './../features/filter/filterSlice'
import searchReducer from './../features/search/moviesSearchSlice'

const store = configureStore({
  reducer: {
    movies: moviesReducer,
    filter: filterReducer,
    search: searchReducer,
  },
})

export type RootState = ReturnType<typeof store.getState>

export default store
