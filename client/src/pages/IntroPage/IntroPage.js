import React from "react";
import { NavLink } from "react-router-dom";
import s from './IntroPage.module.css'

export default function IntroPage() {
  return (
    <section className={s.intro}>
      <div className={`${s.wrapper} ${s.container}`}>
        <div className={s.title}>
          <h1 className={s.titleText}>
            Безопасное облачное хранилище файлов с шифрованием данных!
          </h1>
        </div>
        <div className={s.subtitle}>
          <ul className={s.list}>
            <li className={s.listItem}>
              <h2 className={s.itemTitle}>
                Шифрование с помощью криптографических средств
              </h2>
            </li>
            <li className={s.listItem}>
              <h2 className={s.itemTitle}>
                Двухфакторная аутентификация с помощью Telegram
              </h2>
            </li>
            <li className={s.listItem}>
              <h2 className={s.itemTitle}>Корпоративный доступ</h2>
            </li>
            <li className={s.listItem}>
              <h2 className={s.itemTitle}>Защищённый сервер</h2>
            </li>
          </ul>
        </div>
        <div className={s.buttonWrapper}>
          <NavLink className={s.buttonLink} to="/auth">
            <h2 className={s.buttonTitle}>Создать хранилище</h2>
          </NavLink>
        </div>
      </div>
    </section>
  );
}
