import { ADD_CHAT, SET_CHATS } from "../actions/actionTypes"

const initialState = []

const chatLogsReducer =  (state = initialState, { type, payload }) => {
    switch (type) {

    case SET_CHATS:
        return payload
    case ADD_CHAT:
        return [...state , payload]
    default:
        return state
    }
}
export default chatLogsReducer