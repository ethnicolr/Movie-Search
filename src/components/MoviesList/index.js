import React from 'react'
import {connect} from "react-redux" 
import PropTypes from 'prop-types'

const MoviesList = props => {
    return (
        <div>
            {props.movies.map(movie => {
                return (
                    <li key={movie.id}>{movie.title}</li>
                )
            })}
        </div>
    )
}

MoviesList.propTypes = {

}

const mapStateToProps = state => ({
    movies: state.moviesList.movies
})

export default MoviesList
