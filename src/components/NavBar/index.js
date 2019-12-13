import React from "react";
import PropTypes from "prop-types";
import { NavLink } from "react-router-dom";
import "./style.scss";

const NavBar = props => {
  return (
    <nav className="main-nav">
      <ul className="main-nav__items">
        <li className="main-nav__item">
          <NavLink exact activeClassName="main-nav__selected" to="/">
            Popular
          </NavLink>
        </li>
        <li className="main-nav__item">
          <NavLink activeClassName="main-nav__selected" to="/upcoming">
            Up comning
          </NavLink>
        </li>
        <li className="main-nav__item">
          <NavLink activeClassName="main-nav__selected" to="/top_rated">
            Top rated
          </NavLink>
        </li>
        <li className="main-nav__item">
          <NavLink activeClassName="main-nav__selected" to="/favorite">
            Favorite
          </NavLink>
        </li>
        <li className="main-nav__item">
          <NavLink activeClassName="main-nav__selected" to="/filter">
            Filter
          </NavLink>
        </li>
      </ul>
    </nav>
  );
};

NavBar.propTypes = {};

export default NavBar;
