import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import {
  fetchMovieType,
  getMovies,
  Options,
  MoviesResult,
  MovieType
} from "./../../api/movieApi";

interface fetchProps {
  pathname: fetchMovieType;
  options: Options;
}

export const fetchSearch = createAsyncThunk(
  "movies/fetchSearch",
  async (props: fetchProps) => {
    const { pathname, options } = props;
    const moviesSearch = await getMovies(pathname, options);
    return moviesSearch as MoviesResult;
  }
);

export const fetchMovies = createAsyncThunk(
  "movies/fetchMovies",
  async (props: fetchProps) => {
    const { pathname, options } = props;
    const moviesSearch = await getMovies(pathname, options);
    return moviesSearch as MoviesResult;
  }
);

interface MovieState {
  moviesList: MovieType[];
  moviesStatus: "indle" | "pendiing" | "succeeded" | "failed";
  pages: number;
  favorite: MovieType[];
  searchList: MovieType[];
  searchStatus: "indle" | "pendiing" | "succeeded" | "failed";
  error: null | {};
}

const initialState: MovieState = {
  moviesList: [],
  moviesStatus: "indle",
  pages: 0,
  error: null,
  favorite: [],
  searchList: [],
  searchStatus: "indle",
};

const moviesSlice = createSlice({
  name: "movies",
  initialState,
  reducers: {
    addFavorite: (state, action: PayloadAction<MovieType>) => {
      state.favorite.push(action.payload);
    },
    deleteFavorite: (state, action: PayloadAction<string>) => {
      state.favorite = state.favorite.filter(
        (movie: MovieType) => movie.id !== action.payload
      );
    },
    clearSearch: (state) => {
      state.searchList = [];
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchSearch.pending, (state, action) => {
      state.searchStatus = "pendiing";
    });

    builder.addCase(fetchSearch.fulfilled, (state, action) => {
      state.searchStatus = "succeeded";
      state.searchList = action.payload.moviesList.slice(0, 5);
    });
    builder.addCase(fetchSearch.rejected, (state, action) => {
      state.searchStatus = "failed";
    });

    builder.addCase(fetchMovies.pending, (state, action) => {
      state.moviesStatus = "pendiing";
    });

    builder.addCase(fetchMovies.fulfilled, (state, action) => {
      const { moviesList, pageCount, page } = action.payload;
      state.moviesStatus = "succeeded";

        state.moviesList = moviesList;
      

      state.pages = pageCount;
    });
    builder.addCase(fetchMovies.rejected, (state, action) => {
      state.moviesStatus = "failed";
    });
  },
});

export const { addFavorite, deleteFavorite, clearSearch } = moviesSlice.actions;

export default moviesSlice.reducer;
