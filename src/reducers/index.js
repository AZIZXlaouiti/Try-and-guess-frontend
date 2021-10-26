import { combineReducers } from "redux";
import sessionsReducer from "./sessionsReducer";
import connectionsReducer from "./connectionsReducer";
import ChatLogsReducer from "./chatLogsReducer";
export default combineReducers({
    connections: connectionsReducer,
    sessions: sessionsReducer,
    chatLogs: ChatLogsReducer
})