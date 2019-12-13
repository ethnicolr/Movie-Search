import * as types from "./../constants";

import { getUrl } from "./../constants/Api";

const receiveMovies = data => ({
  type: types.RECEIVE_MOVIES,
  movies: data.results,
  pages: data.total_pages
});

const receiveSearch = data => ({
  type: types.RECEIVE_SEARCH, 
  results: data.results
})

export const receiveDetails = data => ({
  type: types.RECEIVE_DETAILS,
  data: data
});

export const addFavorite = movieId => ({
  type: types.ADD_FAVORITE,
  movie: movieId
});

export const removeFavorite = movieId => ({
  type: types.REMOVE_FAVORITE,
  movie: movieId
});

export const receiveGenres = data => ({
  type: types.RECEIVE_GENRES,
  genres: data.genres
});

export const changeGenres = genre => ({
  type: types.CHANGE_GENRES,
  genre: genre
});

export const sortBy = sort => ({
  type: types.SORT_BY,
  sortBy: sort
});

export const receiveCredits = data => ({
  type: types.RECEIVE_CREDITS,
  credits: data.cast
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
  const movie = await callApi(getUrl["/movie"](movieId));
  const credits = await callApi(getUrl["/credits"](movieId));
  dispatch(receiveDetails(movie));
  dispatch(receiveCredits(credits));
}

export const fetchGenres = () => async dispatch => {
  const url = getUrl["/genres"]();
  const data = await callApi(url)
  dispatch(receiveGenres(data));
};

