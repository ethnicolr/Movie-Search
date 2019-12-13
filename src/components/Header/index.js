import React, {useState, useEffect} from "react";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import { withRouter } from "react-router";
import NavBar from "./../NavBar";
import Input from "./../Input";
import logo from "./../../style/react-logo.png";
import "./style.scss";

const Header = props => {
  const [hidden, setHidden ] = useState(true);

  const handleClick = () => {
    setHidden(hidden => !hidden);
  }

  useEffect(() => {
   setHidden(true); 
  }, [props.location.key])

  
  let btn = hidden ? " header__btn--search" : " header__btn--close";

  return (
    <header className="header">
      <div className="header__container">
        <Link className="header__logo" to="/">
          <img src={logo} className="header__img" alt="logo" />
          <h1>Movies-Search</h1>
        </Link>
        <NavBar />
        <div className="header__btns">
          <button className={`header__btn ${btn}`} onClick={handleClick}/>
        </div>
        <Input hidden={hidden}/>
      </div>
    </header>
  );
};

Header.propTypes = {};

export default withRouter(Header);
