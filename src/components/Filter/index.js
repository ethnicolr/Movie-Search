import React from 'react';
import PropTypes from 'prop-types';
import Genres from './../LoadGenres';
import Sorting from "./../Sorting";
import LoadMovies from "./../LoadMovies";

const Filter = props => {
    return (
        <div className="filter">
            
            <h1>test</h1>
            <Genres />
            <Sorting />
            <LoadMovies location={{pathname: "/filter"}}/>

        </div>
    )
}

Filter.propTypes = {

}

export default Filter
