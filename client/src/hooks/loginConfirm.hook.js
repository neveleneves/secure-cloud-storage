import {useState} from 'react'

export const useLoginConfirm = () => {
    const [loginConfirmState, setLoginConfirm] = useState({
        jsonToken: '',
        userSuccessID: ''
    })

    const changeLoginConfirm = (userForLogin) => {
        setLoginConfirm({...userForLogin})
    }

    return {
        loginConfirmState,
        changeLoginConfirm
    }
};
  