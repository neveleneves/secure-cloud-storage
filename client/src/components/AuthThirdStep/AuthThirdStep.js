import React from "react";
import s from './AuthThirdStep.module.css'

export const AuthThirdStep = () => {
  return (
    <div className={s.step}>
      <div className={s.stepWrapper}>
        <h2 className={s.title}>
          Шаг 3: Завершение регистрации
        </h2>
      </div>
    </div>
  );
};
