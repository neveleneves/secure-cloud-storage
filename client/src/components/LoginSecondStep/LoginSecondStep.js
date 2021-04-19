import React, { useEffect, useState} from "react";
import { useActiveStep } from "../../hooks/activeStep.hook";
import { useDoneStep } from "../../hooks/doneStep.hook";
import { useRequst } from "../../hooks/request.hook";
import {MessageError} from "../MessageError/MessageError"
import {MessageSuccess} from "../MessageSuccess/MessageSuccess";

import s from './LoginSecondStep.module.css'

export const LoginSecondStep = (props) => {
  const authType = props.type;
  const step = props.authStateStep;
  const secretCodeForm = props.authSCForm
  const {...errorsData} = props.authErrors;
  const {...stepSuccess} = props.authSuccess

  const {stepInactiveStyles, stepInactiveTitle, stepInactiveBody, activeStep, resetActiveStep} = useActiveStep(s);
  const {stepActiveStyles, stepActiveTitle, stepActiveBody, disableStep, resetDoneStep} = useDoneStep(s);
  const {loadingProcess, ajaxRequest, error} = useRequst();

  const [buttonStyle, setButtonStyle] = useState(`${s.buttonVerify}`);
  const [stateButton, setActiveButton] = useState(true);
  const [stateSecretCode, setStateSecretCode] = useState(false)

  useEffect(() => {
    if(step.stepState.active === 'authSecondStep') {
      activeStep(s)
      resetDoneStep(s)
    } else if(step.stepState.active === 'authThirdStep') {
      disableStep(s)
      resetActiveStep(s)
    }
  }, [step.stepState.active, activeStep, disableStep, resetActiveStep, resetDoneStep])


  const changeStateButton = () => {
    setActiveButton(false);
    setButtonStyle(`${s.buttonVerifyActive}`);
  }

  const sendCodeHandler = async () => {
    try {
      errorsData.changeErrors(false);
      const isCodeSend = await ajaxRequest(`/api/auth/login/secret_code/request`); 

      if (isCodeSend) {
        setStateSecretCode(true)
        changeStateButton();
      }
    } catch (e) {
      errorsData.changeErrors(true);
    }
  }

  const verifyTgCodeHandler = async () => {
    try {
      errorsData.changeErrors(false);
      stepSuccess.changeSuccess(true);

      const verifyCheck = await ajaxRequest(`/api/auth/login/secret_code/verify`,
      'POST', {...secretCodeForm.secretCodeInput}); 

      if (verifyCheck) {
        stepSuccess.changeSuccess(true);
        step.switchActiveStep('doneAuthSecondStep');
      }
    } catch (e) {
      errorsData.changeErrors(true);
    }
  }

  const submitHandler = (event) => {
    event.preventDefault();
  }

  return (
    <div 
    className={step.stepState.active === 'authThirdStep' ? 
    stepActiveStyles : 
    stepInactiveStyles}>
      <div className={s.stepWrapper}>
        <h2 
        className={step.stepState.active === 'authThirdStep' ? 
        stepActiveTitle : 
        stepInactiveTitle}>
          Шаг 2: Авторизация с помощью Telegram-бота
        </h2>
        <div 
        className={step.stepState.active === 'authThirdStep' ? 
        stepActiveBody : 
        stepInactiveBody}>
          <div className={s.bodyContainer}>
            <div className={s.infoWrapper}>
              <div className={s.textWrapper}>
                {!stateSecretCode ? 
                    <h3 className={s.subtitle}>
                    Для продолжения авторизируйте аккаунт с помощью Telegram.
                    <br/>Telegram-бот вышлет вам серкретный ключ для продолжения авторизации.
                    </h3>
                  :
                    <h3 className={s.subtitle}>
                    Telegram-бот выслал вам серкретный ключ.
                    <br/>Введите его в поле для ввода и подтвердите вход в аккаунт.
                    </h3>
                }
              </div>
              <div className={s.keyContainer}>
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
              </div>
            </div>
            <div className={s.navKey}>
              {(error && errorsData.isError) ? <MessageError message={error.message}/> : null}
              {stepSuccess.isSuccess ? <MessageSuccess type={authType}/> : null}
              <button 
              className={s.buttonSendKey}
              onClick={sendCodeHandler}
              disabled={loadingProcess}
              >Выслать ключ</button>
              <button 
              className={buttonStyle}
              onClick={verifyTgCodeHandler}
              disabled={stateButton}
              >Подтвердить</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
