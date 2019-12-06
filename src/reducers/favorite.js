import { ADD_FAVORITE, REMOVE_FAVORITE } from "../constants";

export default function favorite (state = [], action) {
  switch (action.type) {
    case ADD_FAVORITE:
      return [...state, action.movie];

    case REMOVE_FAVORITE:
      return state.filter(movie => movie.id !== action.movie);

    default:
      return state;
  }
}
