import React from "react";
import s from './AuthThirdStep.module.css'

export const AuthThirdStep = (props) => {
  const authType = props.type;

  return (
    <div className={s.step}>
      <div className={s.stepWrapper}>
        <h2 className={s.title}>
          {authType === 'registration' ? 
          `Шаг 3: Завершение регистрации` : 
          `Шаг 3: Завершение авторизации`}
        </h2>
      </div>
    </div>
  );
};
