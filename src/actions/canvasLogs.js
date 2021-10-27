import { CLEAR_CANVAS, SET_CANVAS } from "./actionTypes"

export const setLines= (payload)=>{
    return {
        type:SET_CANVAS,
        payload
    }
}
export const clearCanvas = (payload)=>{
    return {
        type:CLEAR_CANVAS,
        payload
    }
}