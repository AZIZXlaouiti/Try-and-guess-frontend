import { SET_CANVAS } from "../actions/actionTypes"


const initialState = []

const canvasLogsReducer =  (state = initialState, { type, payload }) => {
    switch (type) {

    case SET_CANVAS:
        return payload 

    default:
        return state
    }
}
export default canvasLogsReducer
