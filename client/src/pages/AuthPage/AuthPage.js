import React, { useContext, useEffect } from "react";
import { NavLink } from "react-router-dom";

import { AuthFirstStep } from "../../components/AuthFirstStep/AuthFirstStep";
import { RegSecondStep } from "../../components/RegSecondStep/RegSecondStep";
import { LoginSecondStep } from "../../components/LoginSecondStep/LoginSecondStep";
import { RegThirdStep } from "../../components/RegThirdStep/RegThirdStep";
import { LoginThirdStep } from "../../components/LoginThirdStep/LoginThirdStep";

import s from "./AuthPage.module.css";

import { useHandlerForm } from "../../hooks/handlerForm.hook";
import { useHandlerErrors } from "../../hooks/handlerErrors.hook";
import { useHandlerSuccess } from "../../hooks/handlerSuccess.hook";
import { useToggleTab } from "../../hooks/authToggle.hook";
import { useSwitchStep } from "../../hooks/switchAuthSteps.hook";
import { useSecretCode } from "../../hooks/secretCode.hook";
import { useHandlerSC } from "../../hooks/handlerSCForm.hook";
import { useSuccessLogin } from "../../hooks/successLogin.hook";
import { useLoginConfirm } from "../../hooks/loginConfirm.hook";

import { AuthContext } from "../../context/authContext";

export default function AuthPage() {
  //Hook for toggle a auth type
  const authTabHandler = useToggleTab();

  //Hook for switch a active auth step
  const authStateStep = useSwitchStep();

  //Hooks for success and error message
  const authErrorsHandler = useHandlerErrors();
  const authSuccessHandler = useHandlerSuccess();

  //Hook for user form into 1st auth step
  const authFormHandler = useHandlerForm();

  //Hook for secret code message into 2nd step (register)
  const authSecretCode = useSecretCode();

  //Hook for secret code form into 2nd step (login)
  const authSCHandler = useHandlerSC();

  const authConfirmPass = useLoginConfirm();

  const authConfirmStatus = useContext(AuthContext);

  const {
    resetLoginSuccess,
    activeLoginSuccess,
    buttonState,
    buttonStyle,
  } = useSuccessLogin(s);

  useEffect(() => {
    if (
      authStateStep.stepState.active === "authThirdStep" &&
      authTabHandler.authType === "login"
    ) {
      activeLoginSuccess(s);
    }
  }, [
    authStateStep.stepState.active,
    authTabHandler.authType,
    activeLoginSuccess,
  ]);

  const tabClickHandler = (event) => {
    //Toggle auth type and reset active step
    authTabHandler.activeTabHandler(event);
    authStateStep.switchActiveStep("defaultAuthStep");

    //Reset state for steps, clean a forms/messages
    authFormHandler.clearInputs();
    authErrorsHandler.changeErrors(false);
    authSecretCode.clearSecretCode();
    authSCHandler.clearSCInput();
    resetLoginSuccess(s);
  };

  const loginConfirmHandler = () => {
    if (authConfirmPass.loginConfirmState) {
      authConfirmStatus.confirmUserPass(authConfirmPass.loginConfirmState);
    }
  };

  return (
    <section className={s.auth}>
      <div className={`${s.wrapper} ${s.container}`}>
        <div className={s.content}>
          <div className={`${s.wrapperContent} ${s.containerContent}`}>
            <div className={s.contentHeader}>
              <div className={s.title}>
                <span className={s.titleLine}></span>
                <h1 className={s.titleText}>Регистрация и вход</h1>
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
                  Регистрация
                </button>
                <button
                  className={authTabHandler.loginTabClasses}
                  onClick={tabClickHandler}
                  name="login"
                >
                  Авторизация
                </button>
              </div>
              <div className={s.authSteps}>
                <AuthFirstStep
                  type={authTabHandler.authType}
                  authForm={authFormHandler}
                  authErrors={authErrorsHandler}
                  authSuccess={authSuccessHandler}
                  authStateStep={authStateStep}
                />
                <span className={s.authStepLine}></span>
                {authTabHandler.authType === "registration" ? (
                  <RegSecondStep
                    type={authTabHandler.authType}
                    authSecretCode={authSecretCode}
                    authStateStep={authStateStep}
                    authErrors={authErrorsHandler}
                    authSuccess={authSuccessHandler}
                  />
                ) : (
                  <LoginSecondStep
                    type={authTabHandler.authType}
                    authSCForm={authSCHandler}
                    authStateStep={authStateStep}
                    authErrors={authErrorsHandler}
                    authSuccess={authSuccessHandler}
                    authConfirmPass={authConfirmPass}
                  />
                )}
                <span className={s.authStepLine}></span>
                {authTabHandler.authType === "registration" ? (
                  <RegThirdStep authStateStep={authStateStep} />
                ) : (
                  <LoginThirdStep authStateStep={authStateStep} />
                )}
                {/* <span className={s.authStepLine}></span> */}
              </div>
              <div className={s.authNav}>
                {authTabHandler.authType === "login" ? (
                  <NavLink to="/storage">
                    <button
                      onClick={loginConfirmHandler}
                      className={buttonStyle}
                      disabled={buttonState}
                    >
                      Завершить
                    </button>
                  </NavLink>
                ) : null}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
