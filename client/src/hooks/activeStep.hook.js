import {useState} from 'react'

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

    const activeStep = (s) => {
        setTimeout(activeTitle, 1000, s);
        setTimeout(showStep, 1000, s);
        setTimeout(activeStepMask, 2000, s);
        setTimeout(hideStepMask, 2500, s);
    }

    return {
        stepStyles,
        stepTitleStyle,
        stepBodyStyle,
        activeStep
    }
};
  