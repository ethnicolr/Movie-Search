import React from "react";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";

import NavBar from "./../NavBar";
import Input from "./../Input";
import logo from "./../../style/react-logo.png";
import "./style.scss";

const Header = props => {
  return (
    <header className="main-header">
      <div className="main-header__container">
        <Link className="main-header__logo" to="/">
          <img src={logo} className="main-header__img" alt="logo" />
          <h1>Movies-Search</h1>
        </Link>
        <Input />
        <NavBar />
      </div>
    </header>
  );
};

Header.propTypes = {};

export default Header;
