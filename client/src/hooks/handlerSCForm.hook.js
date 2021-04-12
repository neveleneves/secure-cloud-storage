import {useState} from 'react'

export const useHandlerSC = () => {
  const [secretCodeInput, setSecretCodeInput] = useState({
    secret_code: ''
  });
  
  const onChangeSCInput = (event) => {
    setSecretCodeInput({...secretCodeInput, [event.target.name]: event.target.value});
  }

  const clearSCInput = () => {
    setSecretCodeInput({...secretCodeInput, 
        secret_code: ''
    });
  }

  return {
    secretCodeInput,
    clearSCInput, 
    onChangeSCInput,
  }
};
  