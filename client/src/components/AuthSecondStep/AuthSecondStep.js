import React from "react";
import s from './AuthSecondStep.module.css'

export const AuthSecondStep = () => {
  return (
    <div className={s.step}>
      <div className={s.stepWrapper}>
        <h2 className={s.title}>
          Шаг 2: Регистрация с помощью Telegram-бота
        </h2>
      </div>
    </div>
  );
};
