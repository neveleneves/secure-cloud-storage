import {useState} from 'react'

export const useDoneStep = (s) => {
    const [stepStyles, setStepStyles] = useState(`${s.step}`);
    const [stepTitleStyle, setTitleStyle] = useState(`${s.title} ${s.titleActive}`);
    const [stepBodyStyle, setBodyStyle] = useState(`${s.stepBodyStyle}`)

    const stepMask = (s) => {
        setStepStyles(`${s.step} ${s.stepSuccessMask}`);
    }

    const hideStep = (s) => {
        setStepStyles(`${s.step} ${s.stepSuccessMask} ${s.stepSuccess}`);
        setBodyStyle(`${s.hideBodyStyle}`)
    }

    const disableActiveTitle = (s) => {
        setTitleStyle(`${s.title}`);
    }

    const disableStep = (s) => {
        setTimeout(stepMask, 1500, s);
        setTimeout(hideStep, 2000, s);
        setTimeout(disableActiveTitle, 3000, s)
    }

    return {
        stepStyles,
        stepTitleStyle,
        stepBodyStyle,
        disableStep
    }
};
  