import React, { useState, useEffect, useRef } from "react";
import { NavLink, useLocation } from "react-router-dom";
import github from "./../style/github.svg";
import "./style.scss";

const Navbar: React.FC = () => {
  const wrapperRef = useRef<HTMLElement>(null!);
  const location = useLocation();
  const [isHidden, setHidden] = React.useState<boolean>(true);

  function handleClickOutside(e: MouseEvent): void {
    if (wrapperRef.current && !wrapperRef.current.contains(e.target as Node)) {
      setHidden(true);
      document.body.classList.remove("overlay");
    }
  }

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  useEffect(() => {
    setHidden(true);
    document.body.classList.remove("overlay");
  }, [location.key]);

  const handleClickBtn = () => {
    if (isHidden) {
      setHidden(false);
      document.body.classList.toggle("overlay");
    } else {
      setHidden(true);
      document.body.classList.toggle("overlay");
    }
  };
  return (
    <nav className="nav" ref={wrapperRef}>
      <div className="nav__container">
        <div
          className={
            isHidden ? "nav__toggle" : "nav__toggle nav__toggle--hidden"
          }
        >
          <button
            className="nav__btn"
            onClick={() => handleClickBtn()}
          ></button>
          <span></span>
          <span></span>
          <span></span>
        </div>
        <ul
          className={isHidden ? "nav__items" : "nav__items nav__items--hidden"}
        >
          <li className="nav__item">
            <NavLink
              className="nav__link"
              exact
              activeClassName="nav__selected"
              to="/"
            >
              Popular
            </NavLink>
          </li>
          <li className="nav__item">
            <NavLink
              className="nav__link"
              activeClassName="nav__selected"
              to="/upcoming"
            >
              Up comning
            </NavLink>
          </li>
          <li className="nav__item">
            <NavLink
              className="nav__link"
              activeClassName="nav__selected"
              to="/top_rated"
            >
              Top rated
            </NavLink>
          </li>
          <li className="nav__item">
            <NavLink
              className="nav__link"
              activeClassName="nav__selected"
              to="/favorite"
            >
              Favorite
            </NavLink>
          </li>
          <li className="nav__item">
            <NavLink
              className="nav__link"
              activeClassName="nav__selected"
              to="/filter"
            >
              Filter
            </NavLink>
          </li>
          <li className="nav__item">
            <a
              className="nav__link"
              href="https://github.com/ethnicolr/Movie-Search"
              target="_blank"
              rel="noopener noreferrer"
            >
              <img src={github} alt="github" className="nav__icon" />
            </a>
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default Navbar