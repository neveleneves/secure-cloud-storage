import React from "react";

import s from "./StorageActionNav.module.css";

export default function StorageActionNav() {
  return (
    <div className={s.storageAction}>
      <nav className={s.actionNav}>
        <div className={s.searchRow}>
          <label className={s.searchIcon}>
            <input
              className={s.searchField}
              placeholder="Найти документ"
              id="search"
              type="text"
              name="search"
            />
          </label>
        </div>
        <div className={s.buttonsRow}>
          <button className={s.uploadFile}>Загрузить файл</button>
          <button className={s.createFolder}>Cоздать папку</button>
        </div>
      </nav>
    </div>
  );
}
