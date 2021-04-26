import React from "react";

import s from "./StorageActionNav.module.css";

export default function StorageActionNav() {
  return (
    <div className={s.storageAction}>
      <nav className={s.actionNav}>
        <div className={s.searchRow}>
          <input
            className={s.searchField}
            placeholder="Искать"
            id="search"
            type="text"
            name="search"
          />
        </div>
        <div className={s.buttonsRow}>
          <button className={s.uploadFile}>Загрузить файл</button>
          <button className={s.createFolder}>Cоздать папку</button>
        </div>
      </nav>
      <nav className={s.menuNav}>
        <ul className={s.menuList}>
          <li className={s.menuItem}>
            <a className={s.menuLink} href="/">
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
