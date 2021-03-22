import {useState, useCallback} from 'react'

export const useDoneStep = (s) => {
    const [stepStyles, setStepStyles] = useState(`${s.step} ${s.stepSuccessMask}`);
    const [stepTitleStyle, setTitleStyle] = useState(`${s.title} ${s.titleActive}`);
    const [stepBodyStyle, setBodyStyle] = useState(`${s.stepBodyStyle}`)

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
        setTimeout(stepMask, 1000, s);
        setTimeout(hideStep, 1300, s);
        setTimeout(disableActiveTitle, 1300, s)
    },[])

    return {
        stepStyles,
        stepTitleStyle,
        stepBodyStyle,
        disableStep
    }
};
  