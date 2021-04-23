import { createContext } from "react";

export const AuthContext = createContext({
    token: null,
    userID: null,
    isAuth: false,
    confirmUserPass: null,
})