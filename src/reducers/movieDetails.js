import { RECEIVE_DETAILS, RECEIVE_CREDITS } from "./../constants";

const initialState = {
  movieData: {},
  credits: []
};

function movieDetails(state = initialState, action) {
  switch (action.type) {
    case RECEIVE_DETAILS:
      return {
        ...state,
        movieData: action.data
      };

    case RECEIVE_CREDITS:
      return {
        ...state,
        credits: action.credits
      };

    default:
      return state;
  }
}

export default movieDetails;
