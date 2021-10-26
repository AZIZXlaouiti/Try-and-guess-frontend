import { SET_CHATS } from "../actions/actionTypes"

const initialState = []

const ChatLogsReducer =  (state = initialState, { type, payload }) => {
    switch (type) {

    case SET_CHATS:
        return payload 

    default:
        return state
    }
}
export default ChatLogsReducer