const initialState:any = {
    description:{},
    activeUsers:[]
}

const channelLogsReducer =  (state = initialState, { type, payload }:any) => {
    switch (type) {

    case "SET_ACTIVE_ROOM_USER":
        return {
            ...state,
            activeUsers:[...payload]
        }
    case "ROOM_DESCRIPTION":
        return {
           ...state,
           description:payload, 
           
        }
    default:
        return state
    }
}
export default channelLogsReducer