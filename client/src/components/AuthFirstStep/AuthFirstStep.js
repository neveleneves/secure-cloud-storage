import React, { useState } from "react";
import { useRequst } from "../../hooks/request.hook";
import { useDoneStep } from "../../hooks/doneStep.hook";
import { MessageError } from "../MessageError/MessageError";
import { MessageSuccess } from "../MessageSuccess/MessageSuccess";
import s from './AuthFirstStep.module.css'

export const AuthFirstStep = (props) => {
  const authType = props.type;
  const {...formData} = props.authForm;
  const {...errorsData} = props.authErrors;

  const {loadingProcess, ajaxRequest, error} = useRequst();
  const [stepSuccess, setStepSuccess] = useState(false);
  const {stepStyles, stepTitleStyle, disableStep, stepBodyStyle} = useDoneStep(s);

  const authHandler = async () => {
    try {
      errorsData.changeErrors(false);
      const data = await ajaxRequest(`/api/auth/${authType}`, 'POST', {...formData.authInputs});
      
      if (data) {
        setStepSuccess(true);
        disableStep(s);
      }
    } catch (e) {
      errorsData.changeErrors(true);
    }
  }

  const clearHandler = () => {
    formData.clearInputs();
    errorsData.changeErrors(false)
  }

  const submitHandler = (event) => {
    event.preventDefault();
  }

  return (
    <div className={stepStyles}>
      <div className={s.stepWrapper}>
        <h2 className={stepTitleStyle}>
          {authType === 'registration' ? 
          `Шаг 1: Регистрация аккаунта` : 
          `Шаг 1: Вход в аккаунт`}
        </h2>
        <div className={stepBodyStyle}>
          <h3 className={s.subtitle}>
          {authType === 'registration' ? 
            `Заполните форму для регистрации:` : 
            `Заполните форму для авторизации:`}
          </h3>
          <form className={s.form} onSubmit={submitHandler}>
            <div className={s.formInputs}>
              <div className={s.formRow}>
                <input
                  className={s.formInput}
                  placeholder="E-mail"
                  id="email"
                  type="text"
                  name="email"
                  value={formData.authInputs.email}
                  onChange={formData.onChangeInputs}
                />
                <input
                  className={s.formInput}
                  placeholder="Логин"
                  id="login"
                  type="text"
                  name="login"
                  value={formData.authInputs.login}
                  onChange={formData.onChangeInputs}
                />
              </div>
              <div className={s.formRow}>
                <input
                  className={s.formInput}
                  placeholder="Пароль"
                  id="password"
                  type="password"
                  name="password"
                  autoComplete="On"
                  value={formData.authInputs.password}
                  onChange={formData.onChangeInputs}
                />
                <input
                  className={s.formInput}
                  placeholder="Повторите пароль"
                  id="passwordRepeat"
                  type="password"
                  name="passwordRepeat"
                  autoComplete="On"
                  value={formData.authInputs.passwordRepeat}
                  onChange={formData.onChangeInputs}
                />
              </div>
            </div>
            <div className={s.formNav}>
              {(error && errorsData.isError) ? <MessageError message={error.message}/> : null}
              {stepSuccess ? <MessageSuccess type={authType}/> : null}
              <button
                className={s.buttonBack}
                onClick={clearHandler}
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
    </div>
  );
};
