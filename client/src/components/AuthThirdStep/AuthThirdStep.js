import React, { useEffect } from "react";
import { useActiveStep } from "../../hooks/activeStep.hook";
import { useDoneStep } from "../../hooks/doneStep.hook";

import s from './AuthThirdStep.module.css'

export const AuthThirdStep = (props) => {
  const authType = props.type;
  const step = props.authStateStep;

  const {stepInactiveStyles, stepInactiveTitle, stepInactiveBody, activeStep, resetActiveStep} = useActiveStep(s);
  const {stepActiveStyles, stepActiveTitle, stepActiveBody, disableStep, resetDoneStep} = useDoneStep(s);

  useEffect(() => {
    if(step.stepState.active === 'authThirdStep') {
      activeStep(s)
      resetDoneStep(s)
    } 
    else if(step.stepState.active === 'authDoneStep') {
      disableStep(s)
      resetActiveStep(s)
    }
  }, [step.stepState.active, activeStep, resetDoneStep, disableStep, resetActiveStep])

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
          {authType === 'registration' ? 
          `Шаг 3: Завершение регистрации` : 
          `Шаг 3: Завершение авторизации`}
        </h2>
        <div 
        className={step.stepState.active === 'authDoneStep' ? 
        stepActiveBody : 
        stepInactiveBody}>
          <div className={s.bodyContainer}>
            <div className={s.infoWrapper}>
              <div className={s.textWrapper}>
                {authType === 'registration' ? 
                    <h3 className={s.subtitle}>
                    Ваш аккаунт успешно зарегистрирован!
                    <br/>Для входа в безопасное облачное хранилище выполните авторизацию аккаунта!
                    </h3>
                  :
                    <h3 className={s.subtitle}>
                    Авторизация аккаунта прошла успешно!
                    <br/>Выполняется переадрессация на страницу безопасного облачного хранилища...
                    </h3>
                }
              </div>
              {/* <div className={s.keyContainer}>
                <form className={s.form} onSubmit={submitHandler}>
                  <input
                    className={s.keyInput}
                    placeholder="Введите секретный ключ"
                    id="secret_code"
                    type="text"
                    name="secret_code"
                    value={secretCodeForm.secretCodeInput.secret_code}
                    onChange={secretCodeForm.onChangeSCInput}
                  />
                </form>
              </div> */}
            </div>
            <div className={s.navKey}>
              {/* {(error && errorsData.isError) ? <MessageError message={error.message}/> : null}
              {stepSuccess.isSuccess ? <MessageSuccess type={authType}/> : null} */}
              {/* <button 
              className={s.buttonSendKey}
              onClick={sendCodeHandler}
              disabled={loadingProcess}
              >Выслать ключ</button> */}
              {/* <button 
              className={buttonStyle}
              onClick={verifyTgCodeHandler}
              disabled={stateButton}
              >Подтвердить</button> */}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
