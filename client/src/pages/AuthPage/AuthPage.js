import React, { useState } from "react";
import { AuthFirstStep } from "../../components/AuthFirstStep/AuthFirstStep";
import { AuthSecondStep } from "../../components/AuthSecondStep/AuthSecondStep";
import { AuthThirdStep } from "../../components/AuthThirdStep/AuthThirdStep";
import { AuthDoneStep } from "../../components/AuthDoneStep/AuthDoneStep";
import s from './AuthPage.module.css'

export default function AuthPage() {
  const [regTabClasses, setRegTab] = useState(`${s.tab} ${s.tabActive}`);
  const [loginTabClasses, setLoginTab] = useState(`${s.tab} ${s.tabNotActive}`);
  const [authType, setAuthType] = useState('registration');

  const activeRegHandler = event => {
    if(event.target !== `${s.tab} ${s.tabActive}`) {
      setRegTab(`${s.tab} ${s.tabActive}`);
      setLoginTab(`${s.tab} ${s.tabNotActive}`);

      setAuthType('registration');
    } 
  }

  const activeLoginHandler = event => {
    if(event.target !== `${s.tab} ${s.tabActive}`) {
      setLoginTab(`${s.tab} ${s.tabActive}`);
      setRegTab(`${s.tab} ${s.tabNotActive}`);

      setAuthType('login');
    } 
  }

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
                <a 
                className={regTabClasses}
                onClick={activeRegHandler}
                >
                Регистрация</a>
                <a 
                className={loginTabClasses}
                onClick={activeLoginHandler}
                >
                Авторизация</a>
              </div>
              <div className={s.authSteps}>
                <AuthFirstStep 
                type={authType}
                />
                <span className={s.authStepLine}></span>
                <AuthSecondStep
                 type={authType}
                 />
                <span className={s.authStepLine}></span>
                <AuthThirdStep 
                type={authType}

                />
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
