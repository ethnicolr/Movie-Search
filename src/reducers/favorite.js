import { ADD_FAVORITE, REMOVE_FAVORITE } from "../constants";

export default function favorite (state = [], action) {
  switch (action.type) {

    case ADD_FAVORITE :
       let index = state.map(e => e.id).indexOf(action.movie.id);
       if (index !== -1){
         return [
           ...state.slice(0, index),
           ...state.slice(index + 1)
         ]
       } else {
         return [
           ...state, action.movie
         ]
       }
    // case ADD_FAVORITE:
    //   return [...state, action.movie];

    // case REMOVE_FAVORITE:
    //   return state.filter(movie => movie.id !== action.movie);

    default:
      return state;
  }
}
