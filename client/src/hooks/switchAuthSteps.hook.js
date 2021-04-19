import {useReducer} from 'react'

export const useSwitchStep = () => {
  const reducer = (state, action) => {
      switch (action.type) {
        case 'defaultAuthStep' : return {...state, active: 'authFirstStep'}
        case 'doneAuthFirstStep': return {...state, active: 'authSecondStep'}
        case 'doneAuthSecondStep': return {...state, active: 'authThirdStep'}
        case 'doneAuthThirdStep': return {...state, active: 'authDoneStep'}
        default: return state;
      }
    }
  
    const switchActiveStep = (doneStep) => {
        dispatch({type: doneStep});
      }

    const [stepState, dispatch] = useReducer(reducer, {
      active: 'authFirstStep'
    });

  return {
      stepState,
      switchActiveStep
  }
};