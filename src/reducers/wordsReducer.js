const initialState = [
    "ball"
]
const wordsReducer = (state = initialState, { type, payload }) => {
    switch (type) {

    case "SELECTED_WORD":
        
        state =  state[Math.floor(Math.random() * state.length)] 
        return state
    default:
        return state
    }
}
export default wordsReducer
