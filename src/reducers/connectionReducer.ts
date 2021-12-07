// import {SET_CANVAS_SUBSCRIPTION , SET_CHAT_SUBSCRIPTION} from '../actions/actionTypes'

const initialState = {
   
  }
  
  const connectionsReducer =  (state = initialState, { type, payload }:any) => {
    switch (type) {
      case "SET_CHAT_SUBSCRIPTION":
        return {
         
            ...state,
            chats: payload
         
        }
        case "SET_CANVAS_SUBSCRIPTION":
            return{
          
                    ...state,
                    canvas: payload
            }
        case "SET_CABLE":
          return {
          
              ...state,
              cable:payload
          }
        case "SET_ROOM_SUBSCRIPTION":
          return{
              ...state,
              room: payload
                  
          }    
      default:
        return state
    }
  }
  
  export default connectionsReducer;