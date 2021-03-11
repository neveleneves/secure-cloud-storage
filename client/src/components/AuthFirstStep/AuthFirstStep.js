import React, {useState } from "react";
import { useRequst } from "../../hooks/request.hook";
import { MessageError } from "../MessageError/MessageError";
import s from './AuthFirstStep.module.css'

export const AuthFirstStep = () => {
  const {loadingProcess, ajaxRequest, error} = useRequst()
  const [authForm, setAuthForm] = useState({
    email: '',
    login: '',
    password: '',
    passwordRepeat: ''
  });
  const [isError, setError] = useState(false)

  const authHandler = async () => {
    try {
      const data = await ajaxRequest('/api/auth/registration', 'POST', {...authForm});
      setError(false);
    } catch (e) {
      setError(true);
    }
  }

  const changeFormHandler = event => {
    setAuthForm({...authForm, [event.target.name]: event.target.value});
  }

  return (
    <div className={`${s.step} ${s.stepActive}`}>
      <div className={s.stepWrapper}>
        <h2 className={`${s.title} ${s.titleActive}`}>
          Шаг 1: Регистрация аккаунта
        </h2>
        <h3 className={s.subtitle}>
          Заполните форму для регистрации:
        </h3>
        <div className={s.form}>
          <div className={s.formInputs}>
            <div className={s.formRow}>
              <input
                className={s.formInput}
                placeholder="E-mail"
                id="email"
                type="text"
                name="email"
                onChange={changeFormHandler}
              />
              <input
                className={s.formInput}
                placeholder="Логин"
                id="login"
                type="text"
                name="login"
                onChange={changeFormHandler}
              />
            </div>
            <div className={s.formRow}>
              <input
                className={s.formInput}
                placeholder="Пароль"
                id="password"
                type="password"
                name="password"
                onChange={changeFormHandler}
              />
              <input
                className={s.formInput}
                placeholder="Повторите пароль"
                id="passwordRepeat"
                type="password"
                name="passwordRepeat"
                onChange={changeFormHandler}
              />
            </div>
          </div>
          <div className={s.formNav}>
            {(error && isError) ? <MessageError message={error.message}/> : null}
            <button
              className={s.buttonBack}
              disabled={loadingProcess}
            >Очистить</button>
            <button
              className={s.buttonPost}
              onClick={authHandler}
              disabled={loadingProcess}
            >Отправить</button>
          </div>
        </div>
      </div>
    </div>
  );
};
