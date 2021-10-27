const initialState = {
  count:60 , running:true
}

const timerReducer = (state = initialState, { type, payload }) => {
    switch (type) {

    case "DECREMNET":
        return { ...state,count: state.count -1 }

    default:
        return state
    }
}
export default timerReducer