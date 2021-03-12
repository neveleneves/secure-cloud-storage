import React, {useState } from "react";
import { useRequst } from "../../hooks/request.hook";
import { MessageError } from "../MessageError/MessageError";
import s from './AuthFirstStep.module.css'

export const AuthFirstStep = (props) => {
  const authType = props.type;
  const {...authForm} = props.authData;

  const {loadingProcess, ajaxRequest, error} = useRequst();

  const [authForm, setAuthForm] = useState({
    email: '',
    login: '',
    password: '',
    passwordRepeat: ''
  });
  const [isError, setError] = useState(false)

  const authHandler = async () => {
    try {
      const data = await ajaxRequest(`/api/auth/${authType}`, 'POST', {...authForm});

      setError(false);
    } catch (e) {
      setError(true);
    }
  }

  const cleanHandler = () => {
    setAuthForm({...authForm, 
      email: '',
      login: '',
      password: '',
      passwordRepeat: ''
    });

    setError(false);
  }

  const changeFormHandler = event => {
    setAuthForm({...authForm, [event.target.name]: event.target.value});
  }

  return (
    <div className={`${s.step} ${s.stepActive}`}>
      <div className={s.stepWrapper}>
        <h2 className={`${s.title} ${s.titleActive}`}>
          {authType === 'registration' ? 
          `Шаг 1: Регистрация аккаунта` : 
          `Шаг 1: Вход в аккаунт`}
        </h2>
        <h3 className={s.subtitle}>
        {authType === 'registration' ? 
          `Заполните форму для регистрации:` : 
          `Заполните форму для авторизации:`}
        </h3>
        <form className={s.form}>
          <div className={s.formInputs}>
            <div className={s.formRow}>
              <input
                className={s.formInput}
                value={authForm.email}
                placeholder="E-mail"
                id="email"
                type="text"
                name="email"
                onChange={changeFormHandler}
              />
              <input
                className={s.formInput}
                value={authForm.login}
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
                value={authForm.password}
                placeholder="Пароль"
                id="password"
                type="password"
                name="password"
                onChange={changeFormHandler}
              />
              <input
                className={s.formInput}
                value={authForm.passwordRepeat}
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
              onClick={cleanHandler}
              disabled={loadingProcess}
            >Очистить</button>
            <button
              className={s.buttonPost}
              onClick={authHandler}
              disabled={loadingProcess}
            >Отправить</button>
          </div>
        </form>
      </div>
    </div>
  );
};
