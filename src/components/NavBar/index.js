import React from 'react'
import PropTypes from 'prop-types'
import {
    Link
  } from 'react-router-dom';
import './style.scss'

const NavBar = props => {
    return (
        <nav className="main-nav">
            <ul className="main-nav__items">
                <li className="main-nav__item"><Link to="/"> Popular </Link></li>
                <li className="main-nav__item"><Link to="/upcoming">Up comning</Link></li>
                <li className="main-nav__item"><Link to="/top_rated">Top rated</Link></li>
                <li className="main-nav__item"><Link to="/search"> Favorite </Link></li>
            </ul>
        </nav>
    )
}

NavBar.propTypes = {

}

export default NavBar
