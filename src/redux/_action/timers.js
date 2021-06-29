export const setTimer = (setTimer) => {
    return {
        type: 'SET_TIMER',
        payload: setTimer
    }
}

export const timerOn = (time) => {
    return {
        type: 'TIMER_ON',
        payload: time + 1
    }
}

export const timerOff = () => {
    return {
        type: 'TIMER_OFF'
    }
}
