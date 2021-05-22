import { createContext } from "react";

export const DirectoryPathContext = createContext({
    currentPath: null,
    changeCurrentPath: null,
    backToDirectory: null,
    getFullPath: null
})