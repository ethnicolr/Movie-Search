import {
  FETCH_MOVIES_REQUEST,
  FETCH_MOVIES_FAILURE,
  RECEIVE_MOVIES
} from "./../constants";

import { getUrl } from "./../constants/Api";

const receiveMovies = data => ({
  type: RECEIVE_MOVIES,
  movies: data.results
});

const calApi = url => 
  fetch(url)
  .then(response =>  response.json())
  .then(json => json)


export const fetchMovies = pathname => async dispatch => {
  const url = getUrl[pathname]();
  const json = await calApi(url);
  console.log(json)
  dispatch(receiveMovies(json))
}


// export function fetchMovies(value) {
//   console.log(value);
//   return function(dispatch) {
//     return fetch(
//       `${API_HOSTNAME}search/movie?&${API_KEY}&query=${value}&page=1`
//     )
//       .then(response => response.json())
//       .then(json => dispatch(receiveMovies(json)));
//   };
// }
