import React, { useEffect, useState} from "react";
import { useActiveStep } from "../../hooks/activeStep.hook";
import { useDoneStep } from "../../hooks/doneStep.hook";
import { useRequst } from "../../hooks/request.hook";
import {MessageError} from "../MessageError/MessageError"
import {MessageSuccess} from "../MessageSuccess/MessageSuccess";

import s from './RegSecondStep.module.css'

export const RegSecondStep = (props) => {
  const authType = props.type;
  const step = props.authStateStep;
  const {...errorsData} = props.authErrors;
  const secretCode = props.authSecretCode;

  const {stepInactiveStyles, stepInactiveTitle, stepInactiveBody, activeStep} = useActiveStep(s);
  const {stepActiveStyles, stepActiveTitle, stepActiveBody, disableStep} = useDoneStep(s);
  const {loadingProcess, ajaxRequest, error} = useRequst();

  const [buttonStyle, setButtonStyle] = useState(`${s.buttonVerify}`);
  const [stateButton, setActiveButton] = useState(true);
  const [stepSuccess, setStepSuccess] = useState(false);

  useEffect(() => {
    if(step.stepState.active === 'authSecondStep') {
      activeStep(s)
    } else if(step.stepState.active === 'authThirdStep') {
      disableStep(s)
    }
  }, [step.stepState.active, activeStep, disableStep])


  const changeStateButton = () => {
    setActiveButton(false);
    setButtonStyle(`${s.buttonVerifyActive}`);
  }

  const generateCodeHandler = async () => {
    try {
      errorsData.changeErrors(false);
      const secretCodeValue = await ajaxRequest(`/api/auth/reg/secret_code/generate`); 

      if (secretCodeValue) {
          secretCode.changeSecretCode(secretCodeValue);
          changeStateButton();
      }
    } catch (e) {
      errorsData.changeErrors(true);
    }
  }

  const verifyWebCodeHandler = async () => {
    try {
      errorsData.changeErrors(false);
      const verifyCheck = await ajaxRequest(`/api/auth/reg/secret_code/verify`); 

      if (verifyCheck) {
        setStepSuccess(true);
        step.switchActiveStep('doneAuthSecondStep');
      }
    } catch (e) {
      errorsData.changeErrors(true);
    }
  }

  return (
    <div 
    className={step.stepState.active === 'authThirdStep' ? 
    stepActiveStyles : 
    stepInactiveStyles}>
      <div className={s.stepWrapper}>
        <h2 
        className={step.stepState.active === 'authThirdStep' ? 
        stepActiveTitle : 
        stepInactiveTitle}>
          Шаг 2: Регистрация с помощью Telegram-бота
        </h2>
        <div 
        className={step.stepState.active === 'authThirdStep' ? 
        stepActiveBody : 
        stepInactiveBody}>
          <div className={s.bodyContainer}>
            <div className={s.infoWrapper}>
              <div className={s.textWrapper}>
                {!secretCode.secretCodeValue ? 
                    <h3 className={s.subtitle}>
                    Для продолжения зарегистрируйте аккаунт с помощью Telegram-бота.
                    <br/>Сгененируйте секретный ключ и используйте его в Telegram.
                    </h3>
                  :
                    <h3 className={s.subtitle}>
                    Введите ключ в чате Telegram-бота, по ссылке:
                    <a className={s.link} href="https://t.me/caption_storage_bot" target="_blank" rel="noreferrer"> @caption_storage_bot</a>
                    <br/>После прохождения регистрации, вернитесь и подтвердите верификацию.
                    </h3>
                }
              </div>
              <div className={s.keyMessage}>
                <h1 className={s.messageText}>Ваш секретный ключ:</h1>
                <label 
                className={s.key}>
                  {secretCode.secretCodeValue ? 
                    secretCode.secretCodeValue 
                    : `_ _ _ _ _ _ _ _ _ _`
                  }
                </label>
              </div>
            </div>
            <div className={s.navKeyGenerate}>
              {(error && errorsData.isError) ? <MessageError message={error.message}/> : null}
              {stepSuccess ? <MessageSuccess type={authType}/> : null}
              <button 
              className={s.buttonGenerate}
              onClick={generateCodeHandler}
              disabled={loadingProcess}
              >Сгенерировать</button>
              <button 
              className={buttonStyle}
              onClick={verifyWebCodeHandler}
              disabled={stateButton}
              >Подтвердить</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
