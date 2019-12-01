import React, { Component } from 'react'
import { Route, Switch } from "react-router";
import Header from "./../Header";
import MoviesList from './../MoviesList';

export default class index extends Component {
    render() {
        return (
            <>
                <Header />
                <Switch>

                <MoviesList />
                </Switch>
            </>
        )
    }
}
