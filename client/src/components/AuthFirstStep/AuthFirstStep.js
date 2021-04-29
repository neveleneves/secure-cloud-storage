import React, {useEffect} from "react";
import { useRequst } from "../../hooks/request.hook";
import { useDoneStep } from "../../hooks/doneStep.hook";
import { useActiveStep } from "../../hooks/activeStep.hook";
import { MessageError } from "../MessageError/MessageError";
import { MessageSuccess } from "../MessageSuccess/MessageSuccess";
import s from './AuthFirstStep.module.css'

export const AuthFirstStep = (props) => {
  const authType = props.type;
  const {...formData} = props.authForm;
  const {...errorsData} = props.authErrors;
  const {...stepSuccess} = props.authSuccess
  const step = props.authStateStep;

  const {loadingProcess, ajaxRequest, error} = useRequst();
  const {stepInactiveStyles, stepInactiveTitle, stepInactiveBody, activeStep,resetActiveStep} = useActiveStep(s)
  const {stepActiveStyles, stepActiveTitle, stepActiveBody, disableStep, resetDoneStep} = useDoneStep(s);
  useEffect(() => {
    if(step.stepState.active === 'authFirstStep') {
      activeStep(s)
      resetDoneStep(s)
    } else if(step.stepState.active === 'authSecondStep') {
      disableStep(s)
      resetActiveStep(s)
    }
  }, [step.stepState.active, disableStep, activeStep, resetActiveStep, resetDoneStep])
  
  const authHandler = async () => {
    try {
      errorsData.changeErrors(false);
      
      const data = await ajaxRequest(`/api/auth/${authType}/validate`, 'POST', {...formData.authInputs});
      
      if (data) {
        stepSuccess.changeSuccess(true);
        step.switchActiveStep('doneAuthFirstStep');
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
    <div className={step.stepState.active === 'authSecondStep' ? 
    stepActiveStyles : 
    stepInactiveStyles}>
      <div className={s.stepWrapper}>
        <h2 className={step.stepState.active === 'authSecondStep' ? 
        stepActiveTitle : 
        stepInactiveTitle}>
          {authType === 'registration' ? 
          `Шаг 1: Регистрация аккаунта` : 
          `Шаг 1: Вход в аккаунт`}
        </h2>
        <div className={step.stepState.active === 'authSecondStep' ? 
        stepActiveBody : 
        stepInactiveBody}>
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
              {stepSuccess.isSuccess ? <MessageSuccess type={authType}/> : null}
              <button
                className={s.buttonClear}
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
