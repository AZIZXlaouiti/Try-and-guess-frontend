import { SET_CANVAS } from "./actionTypes"

export const setLines= (payload)=>{
    return {
        type:SET_CANVAS,
        payload
    }
}