import {useState} from 'react'

export const useHandlerSuccess = () => {
  const [isSuccess, setSuccess] = useState(false);
  
  const activeSuccess = () => {
    setSuccess(true)
    setTimeout(setSuccess, 1000, false)
  }

  const changeSuccess = (success) => {
    success ? activeSuccess() : setSuccess(false)
  }

  return {
    changeSuccess,
    isSuccess
  }
};
  