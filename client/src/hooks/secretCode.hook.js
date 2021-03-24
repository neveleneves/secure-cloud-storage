import {useState} from 'react'

export const useSecretCode = () => {
    const [secretCodeValue, setSecretCode] = useState('');

    const clearSecretCode = () => {
        setSecretCode('');
    }

    const changeSecretCode = (secretCode) => {
        setSecretCode(secretCode);
    }

    return {
        secretCodeValue,
        clearSecretCode,
        changeSecretCode
    }
};
  