import {useState} from 'react'

export const useHandlerErrors = () => {
  const [isError, setError] = useState(false);
  
  const changeErrors = (error) => {
    error ? setError(true) : setError(false)
  }

  return {
    changeErrors,
    isError
  }
};
  