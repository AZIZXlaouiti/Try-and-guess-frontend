import { SET_CHATS, REQUESTING, DONE_REQUESTING } from "./actionTypes"
export const setChats = (payload)=>{
    return {
        type:SET_CHATS,
        payload
    }
}
export const loadChats=()=>{
    return async dispatch =>{
        dispatch({ type: REQUESTING });
        const resp = await fetch('http://localhost:3001/chat_messages')
        const data = await resp.json();
        dispatch(setChats(data));
        dispatch({ type: DONE_REQUESTING })
    }
}