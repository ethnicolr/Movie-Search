import React, { Component } from "react";
import { Route, Switch } from "react-router";
import Header from "./../Header";
import LoadMovies from "./../LoadMovies";
import LoadDetails from "./../LoadDetails";
import Filter from "./../Filter";

export default class App extends Component {
  render() {
    return (
      <div>
        <Header />
        <Switch>
          <Route exact path="/">
            <LoadMovies />
          </Route>
          <Route exact path="/upcoming">
            <LoadMovies />
          </Route>
          <Route exact path="/top_rated">
            <LoadMovies />
          </Route>
          <Route exact path="/search">
            <LoadMovies />
          </Route>
          <Route exact path="/favorite">
            <LoadMovies />
          </Route>
          <Route exact path="/filter">
            <Filter />
          </Route>
          <Route exact path={`/movie/:movieId`}>
            <LoadDetails media_type={"movie"} />
          </Route>
          <Route exact path={`/tv/:movieId`}>
            <LoadDetails media_type={"tv"} />
          </Route>
        </Switch>
      </div>
    );
  }
}
