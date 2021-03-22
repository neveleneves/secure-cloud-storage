import {useState} from 'react'
import {useRequst} from './request.hook'
// import {useHandlerErrors} from './handlerErrors.hook'

export const useSecretCode = () => {
    // const {changeErrors, isError} = useHandlerErrors();
    const defalutCodeValue = '_ _ _ _ _ _ _ _ _ _';
    const {loadingProcess, ajaxRequest} = useRequst();
    const [secretCodeValue, setSecretCode] = useState(defalutCodeValue);

    const clearSecretCode = () => {
        setSecretCode(defalutCodeValue)
    }

    const createSecretCode = async () => {
        try {
            const secretCode = await ajaxRequest(`/api/auth/secret_code_reqest`); 

            if (secretCode) {
                setSecretCode(secretCode);
            }
        } catch (e) {
            console.warn("Неудалось сгенирировать секретный ключ: ", e.message);
        }
    }

    return {
        secretCodeValue,
        createSecretCode,
        clearSecretCode,
        loadingProcess,
    }
};
  