const initialState = {
  count:10 , running:false
}

const timerReducer = (state = initialState, { type, payload }) => {
    switch (type) {

    case "START_TIMER":
        return { ...state,count:state.count -=1 , running: true}
    case "SET_TIMER":
        return {...state,count:payload}    
    case "STOP_TIMER":
        return { ...state , running: false  }
    default:
        return state
    }
}
export default timerReducer