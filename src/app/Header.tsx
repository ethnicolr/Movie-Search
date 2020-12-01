import React from "react";
import { Link  } from "react-router-dom";
import {MoviesSearchPage} from "../features/search/moviesSearchPage";
import  {Navbar}  from "./Navbar";
import logo from "./../style/react-logo.png";

import style from './header.module.css'
export const Header = () => {

  return (
    <header className={style.header}>
      <div className={style.container}>
        <Link className={style.logo} to="/">
          <img src={logo} className={style.img} alt="logo" />
          <h1 className={style.title}>Movies-Search</h1>
        </Link>
        <MoviesSearchPage />
        <Navbar />
      </div>
    </header>
  );
};

