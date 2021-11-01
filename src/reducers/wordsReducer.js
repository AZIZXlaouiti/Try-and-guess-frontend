const initialState = [
    "ball","cake","storm",
    "sea","toast","ship",
    "fence","tree","trumpet",
    "jail","goat"
]
const wordsReducer = (state = initialState, { type, payload }) => {
    switch (type) {

    case "SELECTED_WORD":
        
        return state[Math.floor(Math.random() * state.length)] 
    case "RESET":
        return initialState    
    default:
        return state
    }
}
export default wordsReducer
