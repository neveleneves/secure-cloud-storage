import {useState, useCallback} from 'react'

export const useDoneStep = (s) => {
    const [stepActiveStyles, setStepStyles] = useState(`${s.step} ${s.stepSuccessMask}`);
    const [stepActiveTitle, setTitleStyle] = useState(`${s.title} ${s.titleActive}`);
    const [stepActiveBody, setBodyStyle] = useState(`${s.stepBodyStyle}`)

    const resetDoneStep = useCallback(s => {
        setStepStyles(`${s.step} ${s.stepSuccessMask}`)
        setTitleStyle(`${s.title} ${s.titleActive}`)
        setBodyStyle(`${s.stepBodyStyle}`)
    },[])

    const stepMask = (s) => {
        setStepStyles(`${s.step} ${s.stepSuccessMask} ${s.stepSuccessMaskActive}`);
    }

    const hideStep = (s) => {
        setStepStyles(`${s.step} ${s.stepSuccessMask} ${s.stepSuccess}`);
        setBodyStyle(`${s.hideBodyStyle}`)
    }

    const disableActiveTitle = (s) => {
        setTitleStyle(`${s.title}`);
    }

    const disableStep = useCallback(s =>  {
        setTimeout(stepMask, 400, s);
        setTimeout(hideStep, 700, s);
        setTimeout(disableActiveTitle, 700, s)
    },[])

    return {
        stepActiveStyles,
        stepActiveTitle,
        stepActiveBody,
        disableStep,
        resetDoneStep
    }
};
  