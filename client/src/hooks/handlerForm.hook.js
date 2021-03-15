import {useState} from 'react'

export const useHandlerForm = () => {
  const [authInputs, setAuthInputs] = useState({
    email: '',
    login: '',
    password: '',
    passwordRepeat: ''
  });
  
  const onChangeInputs = (event) => {
    setAuthInputs({...authInputs, [event.target.name]: event.target.value});
  }

  const clearInputs = () => {
    setAuthInputs({...authInputs, 
      email: '',
      login: '',
      password: '',
      passwordRepeat: ''
    });
  }

  return {
    authInputs,
    clearInputs, 
    onChangeInputs,
  }
};
  