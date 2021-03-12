import React from "react";
import s from './AuthSecondStep.module.css'

export const AuthSecondStep = (props) => {
  const authType = props.type;

  return (
    <div className={s.step}>
      <div className={s.stepWrapper}>
        <h2 className={s.title}>
          {authType === 'registration' ? 
          `Шаг 2: Регистрация с помощью Telegram-бота` : 
          `Шаг 2: Авторизация с помощью Telegram-бота`}
        </h2>
      </div>
    </div>
  );
};
