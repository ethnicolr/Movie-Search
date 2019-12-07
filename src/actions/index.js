import {
  FETCH_MOVIES_REQUEST,
  FETCH_MOVIES_FAILURE,
  RECEIVE_MOVIES,
  RECEIVE_SEARCH,
  RECEIVE_DETAILS,
  ADD_FAVORITE,
  REMOVE_FAVORITE,
  CHANGE_GENRES,
  RECEIVE_GENRES,
  SORT_BY
} from "./../constants";

import { getUrl } from "./../constants/Api";

const receiveMovies = data => ({
  type: RECEIVE_MOVIES,
  movies: data.results,
  pages: data.total_pages
});

const receiveSearch = data => ({
  type: RECEIVE_SEARCH, 
  results: data.results
})

export const receiveDetails = data => ({
  type: RECEIVE_DETAILS,
  data: data
});

export const addFavorite = movieId => ({
  type: ADD_FAVORITE,
  movie: movieId
});

export const removeFavorite = movieId => ({
  type: REMOVE_FAVORITE,
  movie: movieId
});

export const receiveGenres = data => ({
  type: RECEIVE_GENRES,
  genres: data.genres
});

export const changeGenres = genre => ({
  type: CHANGE_GENRES,
  genre: genre
});

export const sortBy = sort => ({
  type: SORT_BY,
  sortBy: sort
});


const callApi = url => 
  fetch(url)
  .then(response =>  response.json())
  .then(json => json)


export const fetchMovies = options => async dispatch => {
  const url = getUrl[options.path](options);
  const data = await callApi(url);
  dispatch(receiveMovies(data))
}

export const fetchSearch = options => async dispatch => {
  const url = getUrl[options.path](options);
  const data = await callApi(url);
  dispatch(receiveSearch(data));
}

export const fetchDetails = movieId => async dispatch => {
  const url = getUrl["/movie"](movieId);
  const data = await callApi(url);
  dispatch(receiveDetails(data));
}

export const fetchGenres = () => async dispatch => {
  const url = getUrl["/genres"]();
  const data = await callApi(url)
  dispatch(receiveGenres(data));
};


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
