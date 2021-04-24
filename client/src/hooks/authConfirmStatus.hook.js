import {useEffect, useState} from 'react'

import { useRequst } from './request.hook';

export const useConfirmStatus = () => {
    const [token, setToken] = useState('') 
    const [userID, setUserID] = useState('') 
    const [isAuth, setIsAuth] = useState(false)

    const {loadingProcess, ajaxRequest} = useRequst()

    const confirmUserPass = (userForPass) => {
        if(userForPass) {
            setToken(userForPass.jsonToken)
            setUserID(userForPass.userSuccessID)
            setIsAuth(true)
        }
    }

    const confirmUserLogout = () => {
        setToken('')
        setUserID('')
        setIsAuth(false)
    }

    useEffect(() => {
        const checkUserAuth = async () => {
            try {
                const userIsAuth = await ajaxRequest('/api/user/check') 

                if(userIsAuth) {
                    confirmUserPass(userIsAuth)
                }
            } catch (e) {}
        }
        checkUserAuth()
    }, [ajaxRequest]) 

    return {
        token,
        userID,
        isAuth,
        confirmUserPass,
        confirmUserLogout,
        loadingProcess,
    }
};
  