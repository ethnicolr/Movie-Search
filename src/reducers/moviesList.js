import {
  FETCH_MOVIES_REQUEST,
  FETCH_MOVIES_FAILURE,
  RECEIVE_MOVIES
} from "./../constants";

const initialState = {
  movies: []
};

function moviesList(state = initialState, action) {
  console.log(action)
  switch (action.type) {
    case RECEIVE_MOVIES:
      return {
        ...state,
        movies: action.movies
      };
    default:
      return state;
  }
}

export default moviesList;