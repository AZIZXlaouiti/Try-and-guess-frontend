const initialState = [
   ""
]
const wordsReducer = (state = initialState, { type, payload }) => {
    switch (type) {

    case "SELECTED_WORD":
        
        return payload
    case "RESET":
        return initialState    
    default:
        return state
    }
}
export default wordsReducer
