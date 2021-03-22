import {useState, useCallback} from 'react'

export const useActiveStep = (s) => {
    const [stepStyles, setStepStyles] = useState(`${s.step}`);
    const [stepTitleStyle, setTitleStyle] = useState(`${s.title}`);
    const [stepBodyStyle, setBodyStyle] = useState(`${s.hideBodyStyle}`)
    
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
        setTimeout(activeTitle, 1300, s);
        setTimeout(showStep, 1300, s);
        setTimeout(activeStepMask, 1600, s);
        setTimeout(hideStepMask, 1700, s);
    },[])

    return {
        stepStyles,
        stepTitleStyle,
        stepBodyStyle,
        activeStep
    }
};
  