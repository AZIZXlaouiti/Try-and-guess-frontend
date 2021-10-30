import { SET_CHATS } from "./actionTypes"
import { BASE_URL } from "../root"
export const setChats = (payload)=>{
    return {
        type:SET_CHATS,
        payload
    }
}
export const loadChats=()=>{
    return async dispatch =>{
        const resp = await fetch(`${BASE_URL}/chat_messages`)
        const data = await resp.json();
        dispatch(setChats(data));
    }
}