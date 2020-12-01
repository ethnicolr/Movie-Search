import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
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

export const fetchSearch = createAsyncThunk(
  'movies/fetchSearch',
  async (props: fetchProps) => {
    const { pathname, options } = props
    const moviesSearch = await getMovies(pathname, options)
    return moviesSearch as MoviesResult
  }
)

interface MovieState {
  searchList: MovieType[]
  pages: number
  searchStatus: 'indle' | 'pendiing' | 'succeeded' | 'failed'
  error: null | string
}

const initialState: MovieState = {
  pages: 0,
  error: null,
  searchList: [],
  searchStatus: 'indle',
}

const moviesSlice = createSlice({
  name: 'search',
  initialState,
  reducers: {
    clearSearch: (state) => {
      state.searchList = []
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchSearch.pending, (state) => {
      state.searchStatus = 'pendiing'
    })

    builder.addCase(fetchSearch.fulfilled, (state, action) => {
      state.searchStatus = 'succeeded'
      state.searchList = action.payload.moviesList.slice(0, 5)
    })
    builder.addCase(fetchSearch.rejected, (state) => {
      state.searchStatus = 'failed'
    })
  },
})

export const { clearSearch } = moviesSlice.actions

export default moviesSlice.reducer
