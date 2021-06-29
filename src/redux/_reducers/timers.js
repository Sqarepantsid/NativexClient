const initialState = {
    count: 0,
    setTimer: null
}

const timer = (state = initialState, action) => {
    switch (action.type) {
        case 'SET_TIMER':
            return {
                setTimer: action.payload
            }

        case 'TIMER_ON':
            return {
                count: action.payload,
                setTimer: state.setTimer
            }
        case 'TIMER_OFF':
            return {
                count: 0
            }
        default:
            return state;
    }
}


export default timer