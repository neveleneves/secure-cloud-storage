import { useCallback } from "react"

export const useMessageError = () => {
    return useCallback(textMessage => {
        console.log(textMessage);
    }, [])
}