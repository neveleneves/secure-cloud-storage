import {useEffect, useState} from 'react'

import { useRequst } from './request.hook';

export const useConfirmPass = () => {
    const [token, setToken] = useState('') 
    const [userID, setUserID] = useState('') 
    const [isAuth, setIsAuth] = useState(false)

    const {loadingProcess, ajaxRequest, error} = useRequst()

    const confirmUserPass = (userForPass) => {
        if(userForPass) {
            setToken(userForPass.jsonToken)
            setUserID(userForPass.userSuccessID)
            setIsAuth(true)
        }
    }

    useEffect(() => {
        const checkUserAuth = async () => {
            try {
                const userIsAuth = await ajaxRequest('/api/auth/user/login_check') 
                
                if(userIsAuth) {
                    
                }

            } catch (e) {}
        } 
        checkUserAuth()
    }, [ajaxRequest]) 

    return {
        token,
        userID,
        isAuth,
        confirmUserPass
    }
};
  