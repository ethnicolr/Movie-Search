import { combineReducers } from 'redux';
import moviesList from './moviesList';
import search from './search';
import movieDetails from './movieDetails';

export default combineReducers({
    moviesList,
    search,
    movieDetails
})