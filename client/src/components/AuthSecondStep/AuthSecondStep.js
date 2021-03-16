import React from "react";
import s from './AuthSecondStep.module.css'

export const AuthSecondStep = (props) => {
  const authType = props.type;

  return (
    <div className={s.step}>
      <div className={s.stepWrapper}>
        <h2 className={`${s.title} ${s.titleActive}`}>
          {authType === 'registration' ? 
          `Шаг 2: Регистрация с помощью Telegram-бота` : 
          `Шаг 2: Авторизация с помощью Telegram-бота`}
        </h2>
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
  );
};
