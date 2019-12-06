import { combineReducers } from 'redux';
import moviesList from './moviesList';
import search from './search';
import movieDetails from './movieDetails';
import favorite from './favorite';
import filter from './filter';

export default combineReducers({
    moviesList,
    search,
    movieDetails,
    favorite,
    filter
})