import { combineReducers } from "redux";
import channelLogsReducer from "./channelLogsReducer";
import connectionsReducer from "./connectionReducer";
import { sessionReducer } from "./sessionReducer";
export default combineReducers({
    sessions: sessionReducer,
    connections:connectionsReducer,
    channels:channelLogsReducer
})