import { SET_CANVAS_SUBSCRIPTION } from "./actionTypes"
import { SET_CHAT_SUBSCRIPTION } from "./actionTypes"

export const setChatSubscription = (subscription) => {
  return {
    type: SET_CHAT_SUBSCRIPTION,
    payload: subscription
  }
}
export const setCanvasSubscription = (subscription)=>{
    return {
        type: SET_CANVAS_SUBSCRIPTION,
        payload : subscription
    }
}