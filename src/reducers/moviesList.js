import {
  FETCH_MOVIES_REQUEST,
  FETCH_MOVIES_FAILURE,
  RECEIVE_MOVIES
} from "./../constants";

const initialState = {
  movies: [],
  pages: 0
};

function moviesList(state = initialState, action) {
  console.log(action)
  switch (action.type) {
    case RECEIVE_MOVIES:
      return {
        ...state,
        movies: action.movies,
        pages: action.pages
      };
    default:
      return state;
  }
}

export default moviesList;