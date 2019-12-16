import React from "react";
import PropTypes from "prop-types";
import { NavLink } from "react-router-dom";
import menu from './../../style/menu.svg'
import "./style.scss";

const NavBar = ({hidden, hidingElem}) => {
  
  return (
    <nav className="nav">
      <ul className={hidden ? "nav__items nav__items--hidden" : "nav__items"}>
        <li className="nav__item">
          <NavLink exact activeClassName="nav__selected" to="/">
            Popular
          </NavLink>
        </li>
        <li className="nav__item">
          <NavLink activeClassName="nav__selected" to="/upcoming">
            Up comning
          </NavLink>
        </li>
        <li className="nav__item">
          <NavLink activeClassName="nav__selected" to="/top_rated">
            Top rated
          </NavLink>
        </li>
        <li className="nav__item">
          <NavLink activeClassName="nav__selected" to="/favorite">
            Favorite
          </NavLink>
        </li>
        <li className="nav__item">
          <NavLink activeClassName="nav__selected" to="/filter">
            Filter
          </NavLink>
        </li>
      </ul>
      <div className="nav__toggle"><button className="nav__btn" onClick={() => hidingElem("nav")}><img src={menu} alt="menu"/></button>></div>
    </nav>
  );
};

NavBar.propTypes = {};

export default NavBar;
