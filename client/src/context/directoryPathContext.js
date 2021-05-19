import { createContext } from "react";

export const DirectoryPathContext = createContext({
    currentPath: null,
    changeCurrentPath: null,
    getFullPath: null
})