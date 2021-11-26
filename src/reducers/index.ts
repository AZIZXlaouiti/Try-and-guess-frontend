import { combineReducers } from "redux";
import connectionsReducer from "./connectionReducer";
import { sessionReducer } from "./sessionReducer";
export default combineReducers({
    sessions: sessionReducer,
    connections:connectionsReducer
})