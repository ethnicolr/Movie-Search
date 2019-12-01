import React from 'react'
import PropTypes from 'prop-types'
import {
    Link
  } from "react-router-dom";

const NavBar = props => {
    return (
        <nav>
            <ul>
                <li><Link to=""> Popular </Link></li>
                <li><Link to=""> Top rated </Link></li>
                <li><Link to=""> Up comning </Link></li>
                <li><Link to=""> Favorite </Link></li>
            </ul>
        </nav>
    )
}

NavBar.propTypes = {

}

export default NavBar
