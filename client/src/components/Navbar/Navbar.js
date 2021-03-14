import React from "react";
import { NavLink } from "react-router-dom";
import s from './Navbar.module.css'

export const Navbar = (props) => {

  return (
    <header className={s.header}> 
      <nav className={s.navbar}>
        <div className={s.wrapper}>
          <div className={s.logo}>
            <a href="/" className={s.logoLink}>
              Caption
            </a>
          </div>
          <div className={s.menu}>
            <ul className={s.menuList}>
              <li className={s.listItem}>
                <NavLink className={s.itemLink} to="/auth">
                  Вход / Регистрация
                </NavLink>
              </li>
            </ul>
          </div>
        </div>
        <span className={s.navbarLine}></span>
      </nav>
    </header>
  );
};
