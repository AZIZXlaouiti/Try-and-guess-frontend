const initialState:any = {
    description:{},
    activeUsers:[],
    canvas:{},
    word:""
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
    case "SET_CANVAS_LOGS":
        return {
            ...state , 
            canvas:payload
        } 
    case "SET_CHOSEN_WORD":
        return {
            ...state,
            word : payload
        }       
    default:
        return state
    }
}
export default channelLogsReducer