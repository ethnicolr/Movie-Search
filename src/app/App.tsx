import React from 'react'
import { Route, Switch } from 'react-router'
import { Header } from './Header'
import { MovieDetails } from '../features/movies/movieDetails'
import { FilterPage } from '../features/filter/filerPage'
import { moviesCategory } from '../features/movies/moviesLoadCategory'
import { moviesSearch } from '../features/movies/moviesLoadSearch'
import {moviesFavorite} from '../features/movies/moviesLoadFavorite'

function App() {
  return (
    <div>
      <Header />
      <Switch>
        <Route exact path='/' component={moviesCategory} />
        <Route exact path='/upcoming' component={moviesCategory} />
        <Route exact path='/top_rated' component={moviesCategory} />
        <Route exact path='/favorite' component={moviesFavorite} />
        <Route exact path='/search' component={moviesSearch} />
        <Route exact path='/filter' component={FilterPage} />
        <Route exact path={`/:media_type/:movieId`} component={MovieDetails} />
      </Switch>
    </div>
  )
}

export default App
