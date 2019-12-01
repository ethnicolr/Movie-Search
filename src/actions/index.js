import {
  FETCH_MOVIES_REQUEST,
  FETCH_MOVIES_FAILURE,
  RECEIVE_MOVIES
} from "./../constants";

import { API_KEY, API_HOSTNAME } from "./../constants/Api";

const receiveMovies = data => ({
  type: RECEIVE_MOVIES,
  movies: data.results
});

export function fetchMovies(value) {
  return function(dispatch) {
    return fetch(
      `${API_HOSTNAME}search/movie?&${API_KEY}&query=${value}&page=1`
    )
      .then(response => response.json())
      .then(json => dispatch(receiveMovies(json)));
  };
}
