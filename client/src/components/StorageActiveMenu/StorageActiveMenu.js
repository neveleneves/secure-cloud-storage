import React from "react";

import s from "./StorageActiveMenu.module.css";

export const StorageActiveMenu = () => {
  return (
    <div className={s.storageMenu}>
      <nav className={s.menuNav}>
        <ul className={s.menuList}>
          <li className={s.menuItem}>
            <button className={`${s.menuLink} ${s.menuLinkActive}`}>
              Файлы хранилища
            </button>
          </li>
          <li className={s.menuItem}>
            <button className={s.menuLink}>Скрытые папки</button>
          </li>
          <li className={s.menuItem}>
            <button className={s.menuLink}>Скрытые файлы</button>
          </li>
          <li className={s.menuItem}>
            <button className={s.menuLink}>Удаленное</button>
          </li>
        </ul>
      </nav>
    </div>
  );
};
