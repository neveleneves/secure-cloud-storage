import React from "react";

import s from "./StoragePathList.module.css";

export default function StoragePathList() {
  return (
    <ul className={s.filePathList}>
      <li className={s.pathItem}>
        <a className={s.pathLink} href="/">
          Домашняя папка
        </a>
        <span className={s.nextDir}>/</span>
      </li>
      <li className={s.pathItem}>
        <a className={s.pathLink} href="/">
          Работа
        </a>
        <span className={s.nextDir}>/</span>
      </li>
      <li className={`${s.pathItem}`}>
        <a className={`${s.pathLink} ${s.activePathLink}`} href="/">
          Задачи
        </a>
      </li>
    </ul>
  );
}
