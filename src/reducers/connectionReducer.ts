// import {SET_CANVAS_SUBSCRIPTION , SET_CHAT_SUBSCRIPTION} from '../actions/actionTypes'

const initialState = {
    subscriptions: {}
  }
  
  const connectionsReducer =  (state = initialState, { type, payload }) => {
    switch (type) {
      case "SET_CHAT_SUBSCRIPTION":
        return {
         
            ...state.subscriptions,
            chats: payload
         
        }
        case "SET_CANVAS_SUBSCRIPTION":
            return{
          
                    ...state.subscriptions,
                    canvas: payload
            }
      default:
        return state
    }
  }
  
  export default connectionsReducer;