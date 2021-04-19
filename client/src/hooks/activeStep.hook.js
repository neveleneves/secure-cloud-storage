import {useState, useCallback} from 'react'

export const useActiveStep = (s) => {
    const [stepInactiveStyles, setStepStyles] = useState(`${s.step}`);
    const [stepInactiveTitle, setTitleStyle] = useState(`${s.title}`);
    const [stepInactiveBody, setBodyStyle] = useState(`${s.hideBodyStyle}`)

    const resetActiveStep = useCallback(s => {
        setStepStyles(`${s.step}`)
        setTitleStyle(`${s.title}`)
        setBodyStyle(`${s.hideBodyStyle}`)
    },[])

    const activeStepMask = (s) => {
        setStepStyles(`${s.step} ${s.stepStart} ${s.stepStartMask}`);
        setBodyStyle(`${s.stepBodyStyle}`)
    }
    
    const hideStepMask = (s) => {
        setStepStyles(`${s.step} ${s.stepStart} ${s.stepStartMask} ${s.stepStartMaskActive}`);
    }

    const showStep = (s) => {
        setStepStyles(`${s.step} ${s.stepStart}`);
    }

    const activeTitle = (s) => {
        setTitleStyle(`${s.title} ${s.titleActive}`);
    }

    const activeStep = useCallback(s => {
        setTimeout(activeTitle, 700, s);
        setTimeout(showStep, 700, s);
        setTimeout(activeStepMask, 1000, s);
        setTimeout(hideStepMask, 1100, s);
    },[])

    return {
        stepInactiveStyles,
        stepInactiveTitle,
        stepInactiveBody,
        activeStep,
        resetActiveStep
    }
};
  