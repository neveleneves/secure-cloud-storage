import React from "react";

import s from "./StorageActiveMenu.module.css";

export default function StorageActiveMenu() {
  return (
    <div className={s.storageMenu}>
      <nav className={s.menuNav}>
        <ul className={s.menuList}>
          <li className={s.menuItem}>
            <a className={`${s.menuLink} ${s.menuLinkActive}`} href="/">
              Файлы хранилища
            </a>
          </li>
          <li className={s.menuItem}>
            <a className={s.menuLink} href="/">
              Общие папки
            </a>
          </li>
          <li className={s.menuItem}>
            <a className={s.menuLink} href="/">
              Приватные папки
            </a>
          </li>
          <li className={s.menuItem}>
            <a className={s.menuLink} href="/">
              Приватные файлы
            </a>
          </li>
          <li className={s.menuItem}>
            <a className={s.menuLink} href="/">
              Удаленное
            </a>
          </li>
        </ul>
      </nav>
    </div>
  );
}
