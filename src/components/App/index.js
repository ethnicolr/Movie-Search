import React, { Component } from "react";
import { Route, Switch } from "react-router";
import Header from "./../Header";
import LoadMovies from "./../LoadMovies";
import LoadDetails from "../LoadDetails";

export default class index extends Component {
  render() {
    return (
      <>
        <Header />
        <Switch>
          <Route exact path="/" render={props => <LoadMovies {...props} />} />
          <Route
            exact
            path="/upcoming"
            render={props => <LoadMovies {...props} />}
          />
          <Route
            exact
            path="/top_rated"
            render={props => <LoadMovies {...props} />}
          />
          <Route
            exact
            path="/search"
            render={props => <LoadMovies {...props} />}
          />
          <Route
            exact
            path="/favorite"
            render={props => <LoadMovies {...props} />}
          />
          <Route
            exact
            path={`/movie/:movieId`}
            render={({ match }) => (
              <LoadDetails movieId={match.params.movieId} />
            )}
          />
        </Switch>
      </>
    );
  }
}
