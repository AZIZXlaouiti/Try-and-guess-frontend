import {  UserAction } from "./type"
const initialState = {
//    current:[]
}

export const sessionReducer =  (state=initialState, action:UserAction) => {
    switch (action.type) {

    case "LOGIN":

        return { ...action.payload }
    case "LOGOUT":
        return {}
    default:
        return state
    }
}

