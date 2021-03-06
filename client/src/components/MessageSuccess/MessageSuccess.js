import React from "react";
import s from './MessageSuccess.module.css'

export const MessageSuccess = (props) => {
  const authType = props.type;

  return (
    <div className={s.message}>
      <div className={s.wrapper}>
        <h2 className={s.text}>
          {authType === 'registration' ? 
          `Шаг регистрации пользователя выполнен` 
          : `Шаг авторизации пользователя выполнен` }
        </h2>
      </div>
    </div>
  );
};
