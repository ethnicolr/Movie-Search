import React from "react";
import { Route, Switch } from "react-router";
import {Header} from "./app/Header";
import LoadMovies from "./features/movies/LoadMovies";
import {MovieDetails} from "./features/movies/MovieDetails";
import {Filter} from "./features/filter/Filter";

function App() {
  return (
    <div>
      <Header />
      <Switch>
        <Route exact path="/" component={LoadMovies} />
        <Route exact path="/upcoming" component={LoadMovies} />
        <Route exact path="/top_rated" component={LoadMovies} />
        <Route exact path="/search" component={LoadMovies} />
        <Route exact path="/favorite" component={LoadMovies} />
        <Route exact path="/filter" component={Filter} />

        <Route exact path={`/:media_type/:movieId`} component={MovieDetails}/>
      </Switch>
    </div>
  );
}

export default App;