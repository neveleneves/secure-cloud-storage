import React from 'react'
import {Route, Redirect, Switch} from 'react-router-dom'
import IntroPage from './pages/IntroPage/IntroPage'
import AuthPage from './pages/AuthPage/AuthPage'
import StoragePage from './pages/StoragePage/StoragePage'
import ProfilePage from './pages/ProfilePage/ProfilePage'

export const useRoutes = (isAuth) => {
    if(isAuth) {
        return (
            <Switch>
                <Route path="/storage"> 
                    <StoragePage />
                </Route>
                <Route path="/profile"> 
                    <ProfilePage />
                </Route>
                <Route path="/"> 
                    <IntroPage/>
                </Route>
                <Redirect to="/"/>
            </Switch>
        )
    } else {
        return (
            <Switch>
                <Route path="/auth"> 
                    <AuthPage />
                </Route>
                <Route path="/"> 
                    <IntroPage/>
                </Route>
                <Redirect to="/"/>
            </Switch>
        )
    }
}