import React, { useEffect } from "react";
import { useActiveStep } from "../../hooks/activeStep.hook";

import s from './AuthSecondStep.module.css'

export const AuthSecondStep = (props) => {
  const authType = props.type;
  const stepState = props.authStateStep;

  const {stepStyles, stepTitleStyle, stepBodyStyle, activeStep} = useActiveStep(s);
  useEffect(() => {
    if(stepState.stepState.active === 'authSecondStep') {
      activeStep(s);
    }
  }, [stepState.stepState.active])

  return (
    <div className={stepStyles}>
      <div className={s.stepWrapper}>
        <h2 className={stepTitleStyle}>
          {authType === 'registration' ? 
          `Шаг 2: Регистрация с помощью Telegram-бота` : 
          `Шаг 2: Авторизация с помощью Telegram-бота`}
        </h2>
        <div className={stepBodyStyle}>
          <div className={s.textWrapper}>
            <h3 className={s.subtitle}>
            {authType === 'registration' ? 
              `Для продолжения необходимо зарегистрировать аккаунт с помощью Telegram-бота. Сгененируйте секретный ключ и   используйте его в Telegram.` : 
              `Для продолжения необходимо авторизироваться с помощью Telegram-бота.
              Сгененируйте секретный ключ и используйте его  в Telegram.`}
            </h3>
          </div>
          <div className={s.navRow}>
            <div className={s.message}>
              <h1 className={s.messageText}>Ваш секретный ключ:</h1>
              <label 
              className={s.keyMessage}>
                756723342152315 
              </label>
            </div>
            <button className={s.buttonGenerate}>Сгенерировать</button>
          </div>
        </div>
      </div>
    </div>
  );
};
