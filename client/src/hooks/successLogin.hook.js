import {useState} from 'react'

export const useSuccessLogin = (s) => {
    const [buttonStyle, setButtonStyle] = useState(`${s.buttonSubmit}`)
    const [buttonState, setButtonState] = useState(true)

    const resetLoginSuccess = (s) => {
        setButtonStyle(`${s.buttonSubmit}`)
        setButtonState(true)
    }

    const activeLoginSuccess = (s) => {
        setButtonStyle(`${s.buttonSubmitActive}`)
        setButtonState(false)
    }

    return {
        buttonStyle,
        buttonState,
        resetLoginSuccess,
        activeLoginSuccess
    }
};
  