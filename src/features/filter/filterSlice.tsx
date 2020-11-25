import {
  createSlice,
  createAsyncThunk,
  createSelector,
  createEntityAdapter,
  PayloadAction,
} from "@reduxjs/toolkit";

import {genresUrl} from './../../api/movieApi'

export interface Genre {
  id: string
  name: string
  selected: boolean
}

interface FilterState {
  genres: Genre[];
  sortBy: string;
}

const initialState: FilterState = {
  genres: [],
  sortBy: "popularity.desc",
};

export const fetchGenres = createAsyncThunk(
  "filter/fetchGenres",
  async () => {
    const genresResponse = await fetch(genresUrl)
    const genres = await genresResponse.json();
    return genres.genres as Genre[]
  }
);

const filterSlice = createSlice({
  name: "filtet",
  initialState,
  reducers: {
    changeGenres(state, action: PayloadAction<string>): void {
      const genre = state.genres.find(genre =>{
        return genre.id == action.payload})
      if (genre){
        genre.selected = !genre.selected
      }
      // const ind = state.activeGenres.indexOf(action.payload);

      // if (ind !== -1) {
      //   state.activeGenres = state.activeGenres.filter(
      //     (genre) => genre !== action.payload
      //   );
      // } else {
      //   state.activeGenres.push(action.payload);
      // }
    },
    sortBy(state, action) {
      state.sortBy =
        state.sortBy === `${action.payload}.desc`
          ? `${action.payload}.asc`
          : `${action.payload}.desc`;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchGenres.fulfilled, (state, action) => {
      state.genres = action.payload.map(genre => ({...genre, selected: false}))
    })
  }
});

export const { changeGenres, sortBy } = filterSlice.actions;

export default filterSlice.reducer;
