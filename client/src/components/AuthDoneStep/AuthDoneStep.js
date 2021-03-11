import React from "react";
import s from './AuthDoneStep.module.css'

export const AuthDoneStep = () => {
  return (
    <div className={s.step}>
      <div className={s.stepWrapper}>
        <h2 className={s.title}>
          Выполнено
        </h2>
      </div>
    </div>
  );
};
