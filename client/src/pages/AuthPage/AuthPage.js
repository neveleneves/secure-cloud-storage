import React from "react";
import { AuthFirstStep } from "../../components/AuthFirstStep/AuthFirstStep";
import { AuthSecondStep } from "../../components/AuthSecondStep/AuthSecondStep";
import { AuthThirdStep } from "../../components/AuthThirdStep/AuthThirdStep";
import { AuthDoneStep } from "../../components/AuthDoneStep/AuthDoneStep";

import s from './AuthPage.module.css'

import { useHandlerForm } from "../../hooks/handlerForm.hook";
import { useHandlerErrors } from "../../hooks/handlerErrors.hook";
import { useToggleTab } from "../../hooks/authToggle.hook";
import { useSwitchStep } from "../../hooks/switchAuthSteps.hook";
import { useSecretCode } from "../../hooks/secretCode.hook"

export default function AuthPage() {
  const authFormHandler = useHandlerForm();
  const authErrorsHandler = useHandlerErrors();
  const authTabHandler = useToggleTab();
  const authStateStep = useSwitchStep();

  const authSecretCode = useSecretCode();

  const tabClickHandler = (event) => {
    authTabHandler.activeTabHandler(event);
    authFormHandler.clearInputs();
    authErrorsHandler.changeErrors(false);

    authSecretCode.clearSecretCode();
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
                <button 
                className={authTabHandler.regTabClasses}
                onClick={tabClickHandler}
                name="registration"
                >
                Регистрация</button>
                <button 
                className={authTabHandler.loginTabClasses}
                onClick={tabClickHandler}
                name="login"
                >
                Авторизация</button>
              </div>
              <div className={s.authSteps}>
                <AuthFirstStep 
                type={authTabHandler.authType}
                authForm={authFormHandler}
                authErrors={authErrorsHandler}
                authStateStep={authStateStep}
                />
                <span className={s.authStepLine}></span>
                <AuthSecondStep
                 type={authTabHandler.authType}
                 authSecretCode={authSecretCode}
                 authStateStep={authStateStep}
                 authErrors={authErrorsHandler}
                 />
                <span className={s.authStepLine}></span>
                {/* <AuthThirdStep 
                type={authTabHandler.authType} 
                /> */}
                {/* <span className={s.authStepLine}></span> */}
                {/* <AuthDoneStep /> */}
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
