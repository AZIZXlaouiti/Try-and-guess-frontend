const initialState = {
  count:60 , running:true
}

const timerReducer = (state = initialState, { type, payload }) => {
    switch (type) {

    case "START_TIMER":
        return { ...state,count: state.count -1 }
    case "STOP_TIMER":
        return { ...state , running: false  }
    default:
        return state
    }
}
export default timerReducer