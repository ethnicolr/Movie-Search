import {
  FETCH_MOVIES_REQUEST,
  FETCH_MOVIES_FAILURE,
  RECEIVE_MOVIES,
  RECEIVE_SEARCH,
  RECEIVE_DETAILS
} from "./../constants";

import { getUrl } from "./../constants/Api";

const receiveMovies = data => ({
  type: RECEIVE_MOVIES,
  movies: data.results
});

const receiveSearch = data => ({
  type: RECEIVE_SEARCH, 
  results: data.results
})

export const receiveDetails = data => ({
  type: RECEIVE_DETAILS,
  data: data
});

const calApi = url => 
  fetch(url)
  .then(response =>  response.json())
  .then(json => json)


export const fetchMovies = pathname => async dispatch => {
  const url = getUrl[pathname]();
  const data = await calApi(url);
  dispatch(receiveMovies(data))
}

export const fetchSearch = options => async dispatch => {
  const url = getUrl[options.pathname](options);
  const data = await calApi(url);
  dispatch(receiveSearch(data));
}

export const fetchDetails = movieId => async dispatch => {
  const url = getUrl["/movie"](movieId);
  const data = await calApi(url);
  dispatch(receiveDetails(data));
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
