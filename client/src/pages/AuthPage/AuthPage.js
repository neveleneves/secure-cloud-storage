import React from "react";
import { AuthFirstStep } from "../../components/AuthFirstStep/AuthFirstStep";
import { AuthSecondStep } from "../../components/AuthSecondStep/AuthSecondStep";
import { AuthThirdStep } from "../../components/AuthThirdStep/AuthThirdStep";
import { AuthDoneStep } from "../../components/AuthDoneStep/AuthDoneStep";
import s from './AuthPage.module.css'

export default function AuthPage() {
  return (
    <section className={s.auth}>
      <div className={`${s.wrapper} ${s.container}`}>
        <div className={s.content}>
          <div className={`${s.wrapperContent} ${s.containerContent}`}>
            <div className={s.contentHeader}>
              <div className={s.title}>
                <span className={s.titleLine}></span>
                <h1 className={s.titleText}>
                  Регистрация и вход
                </h1>
                <span className={s.titleLine}></span>
              </div>
            </div>
            <div className={s.contentBody}>
              <div className={s.tabs}>
                <a className={`${s.tab} ${s.tabActive}`}>
                  Регистрация
                </a>
                <a className={s.tab}>
                  Авторизация
                </a>
              </div>
              <div className={s.authSteps}>
                <AuthFirstStep />
                <span className={s.authStepLine}></span>
                <AuthSecondStep />
                <span className={s.authStepLine}></span>
                <AuthThirdStep />
                <span className={s.authStepLine}></span>
                <AuthDoneStep />
              </div>
              <div className={s.authNav}>
                {/* <button className="auth__button-back"></button> */}
                <button className={s.buttonSubmit} disabled>
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
