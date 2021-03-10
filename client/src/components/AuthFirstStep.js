import React, {useState } from "react";
import { useRequst } from "../hooks/request.hook";
import { MessageError } from "./MessageError";

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
    <div className="auth-step-container"> 
      <div className="auth__step auth__step_active">
        <div className="auth__step-wrapper">
          <h2 className="auth__step-title auth__step-title_active">
            Шаг 1: Регистрация аккаунта
          </h2>
          <h3 className="auth__step-subtitle">
            Заполните форму для регистрации:
          </h3>
          <div className="auth__step-form">
            <div className="auth__form-inputs">
              <div className="auth__form-row">
                <input
                  className="auth__form-input"
                  placeholder="E-mail"
                  id="email"
                  type="text"
                  name="email"
                  onChange={changeFormHandler}
                />
                <input
                  className="auth__form-input"
                  placeholder="Логин"
                  id="login"
                  type="text"
                  name="login"
                  onChange={changeFormHandler}
                />
              </div>
              <div className="auth__form-row">
                <input
                  className="auth__form-input"
                  placeholder="Пароль"
                  id="password"
                  type="password"
                  name="password"
                  onChange={changeFormHandler}
                />
                <input
                  className="auth__form-input"
                  placeholder="Повторите пароль"
                  id="passwordRepeat"
                  type="password"
                  name="passwordRepeat"
                  onChange={changeFormHandler}
                />
              </div>
            </div>
            <div className="auth__form-nav">
              {(error && isError) ? <MessageError message={error.message}/> : null}
              <button
                className="auth__button-back"
                disabled={loadingProcess}
              >Очистить</button>
              <button
                className="auth__button-post"
                onClick={authHandler}
                disabled={loadingProcess}
              >Отправить</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
