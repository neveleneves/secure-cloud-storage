import React from "react";
import { AuthFirstStep } from "../components/AuthFirstStep";
import { AuthSecondStep } from "../components/AuthSecondStep";
import { AuthThirdStep } from "../components/AuthThirdStep";
import { AuthDoneStep } from "../components/AuthDoneStep";

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
                <a className="auth__tab auth__tab_active" href="/">
                  Регистрация
                </a>
                <a className="auth__tab " href="/">
                  Авторизация
                </a>
              </div>
              <div className="auth__steps">
                <AuthFirstStep />
                <span className="auth__step-line"></span>
                <AuthSecondStep />
                <span className="auth__step-line"></span>
                <AuthThirdStep />
                <span className="auth__step-line"></span>
                <AuthDoneStep />
              </div>
              <div className="auth__nav">
                {/* <button className="auth__button-back"></button> */}
                <button className="auth__button-submit " disabled>
                  Завершить
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
