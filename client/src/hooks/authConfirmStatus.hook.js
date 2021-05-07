import {useEffect, useState} from 'react'

export const useConfirmStatus = () => {
    const [token, setToken] = useState('') 
    const [userID, setUserID] = useState('') 
    const [isAuth, setIsAuth] = useState(false)
    const [loadingProcess, setLoading] = useState(true);
    // const [toLogout, setLogout] = useState(false)

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
        let isCancelled = false
        
        async function checkUserAuth() {
            try {
                const response = await fetch('/api/user/check', {method: 'GET'})
                const userIsAuth = await response.json()
                
                if (!response.ok) {
                    throw new Error(userIsAuth.message || "Запрос был выполнен неверно");
                }
                
                if(!isCancelled) {
                    if(userIsAuth.jsonToken && userIsAuth.userSuccessID) {
                        confirmUserPass(userIsAuth)
                        setLoading(false) 
                    }
                }  
            } catch (e) {
                if(!isCancelled) {
                    // setLogout(true)
                    setLoading(false) 
                }
            }
        }

        checkUserAuth();
        return () => {isCancelled = true}
    }, []) 

    // useEffect(() => {
    //     let isCancelled = false
        
    //     async function logoutUserRequest() {
    //         try {
    //             const response = await fetch('/api/user/logout', {method: 'POST'})
    //             const stateResponse = await response.json()
                
    //             if (!response.ok) {
    //                 throw new Error(stateResponse.message || "Запрос был выполнен  неверно");
    //             }
    //             setLogout(false) 
    //         } catch (e) {
    //             setLogout(false)
    //         }
    //     }
        
    //     if(toLogout) {    
    //         logoutUserRequest();
    //     }
    //     return () => {isCancelled = true}
    // }, [toLogout]) 
    

    return {
        token,
        userID,
        isAuth,
        confirmUserPass,
        confirmUserLogout,
        loadingProcess,
    }
};
  