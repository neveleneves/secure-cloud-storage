import React from "react";

export default function AuthPage() {
  return (
    <section className="auth">
      <div className="auth__wrapper container">
        <div className="auth__content">
          <div className="auth__wrapper-content content-container">
            <div className="content-header">
              <div className="content-header__title">
                <span className="content-header__title-line"></span>
                <h1 className="content-header__title-text">
                  Регистрация и вход
                </h1>
                <span className="content-header__title-line"></span>
              </div>
            </div>
            <div className="content-body">
              <div className="auth__tabs">
                <a className="auth__tab auth__tab_active">Регистрация</a>
                <a className="auth__tab ">Авторизация</a>
              </div>
              <div className="auth__steps">
                <div className="auth__step auth__step_active">
                  <div className="auth__step-wrapper">
                    <h2 className="auth__step-title auth__step-title_active">
                      Шаг 1: Регистрация аккаунта
                    </h2>
                    <h3 className="auth__step-subtitle">
                      Заполните форму для регистрации:
                    </h3>
                    <form className="auth__step-form">
                      <div className="auth__form-row">
                        <input className="auth__form-input"></input>
                        <input className="auth__form-input"></input>
                      </div>
                      <div className="auth__form-row">
                        <input className="auth__form-input"></input>
                        <input className="auth__form-input"></input>
                      </div>
                      <input className="auth__input-back" type="submit"></input>
                      <input
                        className="auth__input-submit"
                        type="submit"
                      ></input>
                    </form>
                  </div>
                </div>
                <span className="auth__step-line"></span>
                <h2 className="auth__step-massage">Выполните предыдущий шаг</h2>
                <div className="auth__step">
                  <div className="auth__step-wrapper">
                    <h2 className="auth__step-title">
                      Шаг 2: Регистрация с помощью Telegram-бота
                    </h2>
                  </div>
                </div>
                <span className="auth__step-line"></span>
                <div className="auth__step">
                  <div className="auth__step-wrapper">
                    <h2 className="auth__step-title">
                      Шаг 3: Завершение регистрации
                    </h2>
                  </div>
                </div>
                <span className="auth__step-line"></span>
                <div className="auth__step">
                  <div className="auth__step-wrapper">
                    <h2 className="auth__step-title">Выполнено</h2>
                  </div>
                </div>
              </div>
              <div className="auth__nav">
                <button className="auth__button-back"></button>
                <button className="auth__button-submit"></button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
