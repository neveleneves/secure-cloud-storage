import React, { useEffect } from "react";
import { useActiveStep } from "../../hooks/activeStep.hook";
import { useDoneStep } from "../../hooks/doneStep.hook";

import s from './LoginThirdStep.module.css'

export const LoginThirdStep = (props) => {
  const step = props.authStateStep;

  const {stepInactiveStyles, stepInactiveTitle, stepInactiveBody, activeStep, resetActiveStep} = useActiveStep(s);
  const {stepActiveStyles, stepActiveTitle, stepActiveBody, disableStep, resetDoneStep} = useDoneStep(s);

  useEffect(() => {
    if(step.stepState.active === 'authThirdStep') {
      activeStep(s)
      resetDoneStep(s)
    } 
    // else if(step.stepState.active === 'authDoneStep') {
    //   disableStep(s)
    //   resetActiveStep(s)
    // }
  }, [step.stepState.active, activeStep, disableStep, resetActiveStep, resetDoneStep])

  return (
    <div 
    className={step.stepState.active === 'authDoneStep' ? 
    stepActiveStyles : 
    stepInactiveStyles}>
      <div className={s.stepWrapper}>
        <h2 
        className={step.stepState.active === 'authDoneStep' ? 
        stepActiveTitle : 
        stepInactiveTitle}>
          Шаг 3: Завершение авторизации
        </h2>
        <div 
        className={step.stepState.active === 'authDoneStep' ? 
        stepActiveBody : 
        stepInactiveBody}>
          <div className={s.bodyContainer}>
            <div className={s.infoWrapper}>
              <div className={s.textWrapper}>
                  <h3 className={s.subtitle}>
                  Авторизация аккаунта прошла успешно!
                  <br/>Завершите авторизацию для перехода на страницу облачного хранилища!
                  </h3>
                <span>
                  <svg width="37" height="37" viewBox="0 0 37 37" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M10.3334 18.5L17.3334 24.3334L26.6667 12.6667M18.5 34.8334C9.47937 34.8334 2.16669 27.5207 2.16669 18.5C2.16669 9.47937 9.47937 2.16669 18.5 2.16669C27.5207 2.16669 34.8334 9.47937 34.8334 18.5C34.8334 27.5207 27.5207 34.8334 18.5 34.8334Z" stroke="#0fb363" strokeWidth="3"/>
                  </svg>
                </span>
              </div>
            </div>
            {/* <div className={s.navKey}>
              {
                authType === 'login' ? 
                <Link to="/storage">
                  <button 
                  className={s.buttonSendKey}
                  >Перейти</button>
                </Link>
                :
                null
              }
            </div> */}
          </div>
        </div>
      </div>
    </div>
  );
};
