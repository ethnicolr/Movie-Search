import React from 'react'
import { connect } from "react-redux";
import PropTypes from 'prop-types'
import {API_KEY, API_HOSTNAME} from "./../../constants/Api";
import {fetchMovies} from './../../actions'

const Input = props => {

   const handleChange = (value) =>{
       console.log("test");
       props.fetchMovies(value);
    //    fetch(`${API_HOSTNAME}search/movie?&${API_KEY}&query=${value}&page=1`)
    //    .then(response => response.json())
    //    .then(json => {
    //        console.log(json);
    //    })

    }

    return (
        <div>
            <form>
                <input
                type="text"
                placeholder="Search movies..."
                onChange = {e => handleChange(e.target.value)}
                />
            </form>
        </div>
    )
}

Input.propTypes = {

}

export default connect(null, {fetchMovies})(Input)
