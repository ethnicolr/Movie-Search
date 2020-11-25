import React from "react";
import { Link  } from "react-router-dom";
import  Navbar  from "./Navbar";
import Search from "../features/movies/Search";
import logo from "./../style/react-logo.png";
import "./style.scss";

export const Header = () => {

  return (
    <header className="header">
      <div className="header__container">
        <Link className="header__logo" to="/">
          <img src={logo} className="header__img" alt="logo" />
          <h1 className="header__title">Movies-Search</h1>
        </Link>

        <Search />
        <Navbar />
      </div>
    </header>
  );
};

