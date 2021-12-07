const initialState:any = [

]

const channelLogsReducer =  (state = initialState, { type, payload }:any) => {
    switch (type) {

    case "SET_ACTIVE_ROOM_USER":
        return [...payload]

    default:
        return state
    }
}
export default channelLogsReducer