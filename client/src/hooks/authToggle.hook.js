import {useState} from 'react'
import s from '../pages/AuthPage/AuthPage.module.css'

export const useToggleTab = () => {
    const [regTabClasses, setRegTab] = useState(`${s.tab} ${s.tabActive}`);
    const [loginTabClasses, setLoginTab] = useState(`${s.tab} ${s.tabNotActive}`);
    const [authType, setAuthType] = useState('registration');

    const activeTabHandler = event => {
        if (event.target.name === 'registration') {
            setRegTab(`${s.tab} ${s.tabActive}`);
            setLoginTab(`${s.tab} ${s.tabNotActive}`);
        } else {
            setLoginTab(`${s.tab} ${s.tabActive}`);
            setRegTab(`${s.tab} ${s.tabNotActive}`);
        }
        setAuthType(`${event.target.name}`); 
    }

    return {
        activeTabHandler,
        regTabClasses,
        loginTabClasses,
        authType
    }
};
  