import React from "react";
import { NavLink } from "react-router-dom";

export const Navbar = () => {
  return (
    <header className="header">
      <nav className="navbar header__navbar">
        <div className="navbar__wrapper">
          <div className="navbar-logo">
            <a href="/" className="navbar-logo__link">
              Caption
            </a>
          </div>
          <div className="navbar-menu">
            <ul className="navbar-menu__list">
              <li className="navbar-menu__item">
                <NavLink className="navbar-menu__link" to="/auth">
                  Вход / Регистрация
                </NavLink>
              </li>
            </ul>
          </div>
        </div>
        <span className="navbar__line"></span>
      </nav>
    </header>
  );
};
