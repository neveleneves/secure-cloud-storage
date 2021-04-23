import React from "react";
import { NavLink } from "react-router-dom";
import s from './Navbar.module.css'

export const Navbar = (props) => {
  const isAuthState = props.isAuth

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
            {
              isAuthState ? 
              <ul className={s.menuList}>
                <li className={s.listItem}>
                  <NavLink className={s.itemLink} to="/">
                    На главную
                  </NavLink>
                </li>
                <li className={s.listItem}>
                  <NavLink className={s.itemLink} to="/storage">
                    Профиль
                  </NavLink>
                </li>
                <li className={s.listItem}>
                  <NavLink className={s.itemLink} to="/logout">
                    Выход
                  </NavLink>
                </li>
              </ul>
              : 
              <ul className={s.menuList}>
                <li className={s.listItem}>
                  <NavLink className={s.itemLink} to="/auth">
                    Вход / Регистрация
                  </NavLink>
                </li>
              </ul>
            }
          </div>
        </div>
        <span className={s.navbarLine}></span>
      </nav>
    </header>
  );
};
