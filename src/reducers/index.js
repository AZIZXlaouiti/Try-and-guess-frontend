import { combineReducers } from "redux";
import sessionsReducer from "./sessionsReducer";
import connectionsReducer from "./connectionsReducer";
export default combineReducers({
    connections: connectionsReducer,
    sessions: sessionsReducer
})