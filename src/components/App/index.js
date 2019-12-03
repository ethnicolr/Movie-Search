import React, { Component } from "react";
import { Route, Switch } from "react-router";
import Header from "./../Header";
import LoadMovies from "./../LoadMovies";

export default class index extends Component {
  render() {
    return (
      <>
        <Header />

        <Switch>
          <Route exact="/" render={props => <LoadMovies {...props} />} />
          <Route
            excat="/upcoming"
            render={props => <LoadMovies {...props} />}
          />
          <Route
            exact="/top_rated"
            render={props => <LoadMovies {...props} />}
          />
          <Route exact="/search" render={props => <LoadMovies {...props} />} />
          <Route
            exact="/favorite"
            render={props => <LoadMovies {...props} />}
          />
        </Switch>
      </>
    );
  }
}
