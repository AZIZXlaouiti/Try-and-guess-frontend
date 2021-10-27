import { CLEAR_CANVAS, SET_CANVAS } from "../actions/actionTypes"


const initialState = []

const canvasLogsReducer =  (state = initialState, { type, payload }) => {
    switch (type) {

    case SET_CANVAS:
        return payload 
    case CLEAR_CANVAS:
        return []
    default:
        return state
    }
}
export default canvasLogsReducer
