import React from 'react'
import { Route, Switch } from 'react-router'
import { Header } from './Header'
import { MoviesListPage } from '../features/movies/moviesListPage'
import { MovieDetails } from '../features/movies/movieDetails'
import { FilterPage } from '../features/filter/filerPage'

function App() {
  return (
    <div>
      <Header />
      <Switch>
        <Route exact path='/' component={MoviesListPage} />
        <Route exact path='/upcoming' component={MoviesListPage} />
        <Route exact path='/top_rated' component={MoviesListPage} />
        <Route exact path='/search' component={MoviesListPage} />
        <Route exact path='/favorite' component={MoviesListPage} />

        <Route exact path='/filter' component={FilterPage} />

        <Route exact path={`/:media_type/:movieId`} component={MovieDetails} />
      </Switch>
    </div>
  )
}

export default App
