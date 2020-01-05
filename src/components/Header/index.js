import React, {useState, useEffect} from "react";
import { Link, useLocation } from "react-router-dom";
import NavBar from "./../NavBar";
import Input from "./../Input";
import logo from "./../../style/react-logo.png";
import "./style.scss";

const Header = props => {
  const [search, setSearch ] = useState(true);
  const [nav, setNav ] = useState(true);

  let location = useLocation();

  const hidingElem = (elem) => {
    if (elem === "nav"){
      setNav(search => !search);
      setSearch(true);
    } else {
      setSearch(setSearch => !setSearch);
      setNav(true);
    }
  }

  useEffect(() => {
    setSearch(true);
    setNav(true)
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


export default Header;
