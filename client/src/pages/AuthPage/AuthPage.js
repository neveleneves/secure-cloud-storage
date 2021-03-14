import React, { useState } from "react";
import { AuthFirstStep } from "../../components/AuthFirstStep/AuthFirstStep";
import { AuthSecondStep } from "../../components/AuthSecondStep/AuthSecondStep";
import { AuthThirdStep } from "../../components/AuthThirdStep/AuthThirdStep";
import { AuthDoneStep } from "../../components/AuthDoneStep/AuthDoneStep";
import s from './AuthPage.module.css'

export default function AuthPage() {
  const [regTabClasses, setRegTab] = useState(`${s.tab} ${s.tabActive}`);
  const [loginTabClasses, setLoginTab] = useState(`${s.tab} ${s.tabNotActive}`);
  const [authType, setAuthType] = useState('registration');
  const [authForm, setAuthForm] = useState({
    email: '',
    login: '',
    password: '',
    passwordRepeat: ''
  });
  const [isError, setError] = useState(false);

  const changeFirstStepInputs = (event) => {
    setAuthForm({...authForm, [event.target.name]: event.target.value});
  }

  const cleanFirstStepInputs = () => {
    setAuthForm({...authForm, 
      email: '',
      login: '',
      password: '',
      passwordRepeat: ''
    });
  }

  const changeFirstStepErrors = (error) => {
    error ? setError(true) : setError(false)
  }

  const activeTabHandler = event => {
    if (event.target.name === 'registration') {
      setRegTab(`${s.tab} ${s.tabActive}`);
      setLoginTab(`${s.tab} ${s.tabNotActive}`);
    }
    else {
      setLoginTab(`${s.tab} ${s.tabActive}`);
      setRegTab(`${s.tab} ${s.tabNotActive}`);
    }

    setAuthType(`${event.target.name}`);

    cleanFirstStepInputs();
    changeFirstStepErrors(false);
  }

  // const activeLoginHandler = event => {
  //   if(event.target !== `${s.tab} ${s.tabActive}`) {
  //     setLoginTab(`${s.tab} ${s.tabActive}`);
  //     setRegTab(`${s.tab} ${s.tabNotActive}`);

  //     setAuthType('login');

  //     cleanFirstStepInputs();
  //     changeFirstStepErrors(false);
  //   } 
  // }

  return (
    <section className={s.auth}>
      <div className={`${s.wrapper} ${s.container}`}>
        <div className={s.content}>
          <div className={`${s.wrapperContent} ${s.containerContent}`}>
            <div className={s.contentHeader}>
              <div className={s.title}>
                <span className={s.titleLine}></span>
                <h1 className={s.titleText}>
                  Регистрация и вход
                </h1>
                <span className={s.titleLine}></span>
              </div>
            </div>
            <div className={s.contentBody}>
              <div className={s.tabs}>
                <button 
                className={regTabClasses}
                onClick={activeTabHandler}
                name="registration"
                >
                Регистрация</button>
                <button 
                className={loginTabClasses}
                onClick={activeTabHandler}
                name="login"
                >
                Авторизация</button>
              </div>
              <div className={s.authSteps}>
                <AuthFirstStep 
                type={authType}
                authData={authForm}
                changeForm={changeFirstStepInputs}
                cleanForm={cleanFirstStepInputs}
                errors={isError}
                changeErrors={changeFirstStepErrors}
                />
                <span className={s.authStepLine}></span>
                <AuthSecondStep
                 type={authType}
                 />
                <span className={s.authStepLine}></span>
                <AuthThirdStep 
                type={authType}

                />
                <span className={s.authStepLine}></span>
                <AuthDoneStep />
              </div>
              <div className={s.authNav}>
                {/* <button className="auth__button-back"></button> */}
                <button className={s.buttonSubmit} disabled>
                  Завершить
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
