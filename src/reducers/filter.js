import { CHANGE_GENRES, SORT_BY, RECEIVE_GENRES } from "../constants";

const initialState = {
  genres: [],
  activeGenres: [],
  sortBy: "popularity.desc"
};

function filter(state = initialState, action) {
  switch (action.type) {
    case RECEIVE_GENRES:
      return {
        ...state,
        genres: [...action.genres]
      };

    case CHANGE_GENRES: {
      let index = state.activeGenres.indexOf(action.genre);
      if (index !== -1) {
        return {
          ...state,
          activeGenres: [
            ...state.activeGenres.filter(genre => genre !== action.genre)
          ]
        };
      } else {
        return {
          ...state,
          activeGenres: [...state.activeGenres, action.genre]
        };
      }
    }

    case SORT_BY: {
      return {
        ...state,
        sortBy:
          state.sortBy === `${action.sortBy}.desc`
            ? `${action.sortBy}.asc`
            : `${action.sortBy}.desc`
      };
    }

    default:
      return state;
  }
}

export default filter;
