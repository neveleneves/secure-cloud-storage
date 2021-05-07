import React, { useContext } from "react";
import { NavLink } from "react-router-dom";

import s from './Navbar.module.css'

import { useRequest } from "../../hooks/request.hook";
import { AuthContext } from "../../context/authContext";

export const Navbar = () => {
  const authConfirmStatus = useContext(AuthContext)
  const {ajaxRequest} = useRequest()

  const logoutHandler = async () => {
    try {
      await ajaxRequest(`/api/user/logout`, 'POST'); 
      authConfirmStatus.confirmUserLogout()
    } catch (e) {}
  }

  return (
    <header className={s.header}> 
      <nav className={s.navbar}>
        <div className={s.wrapper}>
          <div className={s.logo}>
            <a href="/" className={s.logoLink}>
              Caption
            </a>
          </div>
          <nav className={s.menu}>
            {
              authConfirmStatus.isAuth ? 
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
                  <NavLink 
                  className={s.itemLink}
                  onClick={logoutHandler}
                  to="/"
                  >
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
          </nav>
        </div>
        <span className={s.navbarLine}></span>
      </nav>
    </header>
  );
};
