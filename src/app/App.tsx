import React from 'react'
import { Route, Switch } from 'react-router'
import { Header } from './Header'
import { FilterPage } from '../features/filter/filerPage'
import { MoviesContainerFavorite } from '../features/movies/MoviesContainerFavorite'
import { MoviesContainer } from '../features/movies/MoviesContainer'
import { MovieContainerDetails } from './../features/movies/MoviesContainerDetails'

function App(): JSX.Element {
  return (
    <div>
      <Header />
      <Switch>
        <Route exact path='/' component={MoviesContainer} />
        <Route exact path='/upcoming' component={MoviesContainer} />
        <Route exact path='/top_rated' component={MoviesContainer} />
        <Route exact path='/search' component={MoviesContainer} />
        <Route exact path='/favorite' component={MoviesContainerFavorite} />
        <Route exact path='/filter' component={FilterPage} />
        <Route
          exact
          path={`/:media_type/:movieId`}
          component={MovieContainerDetails}
        />
      </Switch>
    </div>
  )
}

export default App
