import React, {useState, useEffect} from "react";
import { Link, useLocation } from "react-router-dom";
import PropTypes from "prop-types";
import NavBar from "./../NavBar";
import Input from "./../Input";
import logo from "./../../style/react-logo.png";
import "./style.scss";

const Header = props => {
  const [search, setSearch ] = useState(false);
  const [nav, setNav ] = useState(false);

  let location = useLocation();

  const hidingElem = (elem) => {
    if (elem === "nav"){
      setNav(search => !search);
      setSearch(false);
    } else {
      setSearch(setSearch => !setSearch);
      setNav(false);
    }
  }

  useEffect(() => {
    setSearch(false);
    setNav(false)
  }, [location.key])

  return (
    <header className="header">
      <div className="header__container">
        <Link className="header__logo" to="/">
          <img src={logo} className="header__img" alt="logo" />
          <h1>Movies-Search</h1>
        </Link>
        <Input hidingElem={hidingElem} hidden={search}/>
        <NavBar hidingElem={hidingElem} hidden={nav}/>
      </div>
    </header>
  );
};

Header.propTypes = {};

export default Header;
