import React from "react";
import { NavLink } from "react-router-dom";

export default function IntroPage() {
  return (
    <section className="intro">
      <div className="intro__wrapper container">
        <div className="intro__title">
          <h1 className="intro__title-text">
            Безопасное облачное хранилище файлов с шифрованием данных!
          </h1>
        </div>
        <div className="intro__subtitle">
          <ul className="intro__list">
            <li className="intro__list-item">
              <h2 className="intro__item-title">
                Шифрование с помощью криптографических средств
              </h2>
            </li>
            <li className="intro__list-item">
              <h2 className="intro__item-title">
                Двухфакторная аутентификация с помощью Telegram
              </h2>
            </li>
            <li className="intro__list-item">
              <h2 className="intro__item-title">Корпоративный доступ</h2>
            </li>
            <li className="intro__list-item">
              <h2 className="intro__item-title">Защищённый сервер</h2>
            </li>
          </ul>
        </div>
        <div className="intro__button">
          <NavLink className="intro__button-link" to="/auth">
            <h2 className="intro__button-title">Создать хранилище</h2>
          </NavLink>
        </div>
      </div>
    </section>
  );
}
