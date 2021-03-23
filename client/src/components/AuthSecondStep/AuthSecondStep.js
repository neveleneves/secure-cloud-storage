import React, { useEffect, useState} from "react";
import { useActiveStep } from "../../hooks/activeStep.hook";
import {MessageError} from "../MessageError/MessageError"

import s from './AuthSecondStep.module.css'

export const AuthSecondStep = (props) => {
  const authType = props.type;
  const stepState = props.authStateStep;
  const secretCode = props.authSecretCode;

  const {stepStyles, stepTitleStyle, stepBodyStyle, activeStep} = useActiveStep(s);
  useEffect(() => {
    if(stepState.stepState.active === 'authSecondStep') {
      activeStep(s)
    }
  }, [stepState.stepState.active, activeStep])
  const [buttonStyle, setButtonStyle] = useState(`${s.buttonVerify}`);
  const [stateButton, setActiveButton] = useState(true);

  const changeStateButton = () => {
    setActiveButton(false);
    setButtonStyle(`${s.buttonVerifyActive}`);
  }

  const generateCodeHandler = () => {
    if(stateButton) {
      changeStateButton();
    }
    secretCode.createSecretCode();
  }

  return (
    <div className={stepStyles}>
      <div className={s.stepWrapper}>
        <h2 className={stepTitleStyle}>
          {authType === 'registration' ? 
          `Шаг 2: Регистрация с помощью Telegram-бота` : 
          `Шаг 2: Авторизация с помощью Telegram-бота`}
        </h2>
        <div className={stepBodyStyle}>
          <div className={s.bodyContainer}>
            <div className={s.infoWrapper}>
              <div className={s.textWrapper}>
                <h3 className={s.subtitle}>
                {authType === 'registration' ? 
                  `Для продолжения зарегистрируйте аккаунт с помощью Telegram-бота. Сгененируйте секретный ключ и используйте его в Telegram.` : 
                  `Для продолжения авторизируйте аккаунт с помощью Telegram-бота.
                  Сгененируйте секретный ключ и используйте его  в Telegram.`}
                </h3>
              </div>
              <div className={s.keyMessage}>
                <h1 className={s.messageText}>Ваш секретный ключ:</h1>
                <label 
                className={s.key}>
                  {secretCode.secretCodeValue}
                </label>
              </div>
            </div>
            <div className={s.navKeyGenerate}>
              {(secretCode.error &&secretCode.isError) ? <MessageError message={secretCode.error.message}/> : null}
              <button 
              className={s.buttonGenerate}
              onClick={generateCodeHandler}
              disabled={secretCode.loadingProcess}
              >Сгенерировать</button>
              <button 
              className={buttonStyle}
              disabled={stateButton}
              >Подтвердить</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
