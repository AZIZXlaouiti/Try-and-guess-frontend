import React , {useEffect}from 'react'
import { useDispatch , useSelector} from 'react-redux'
import { loadChats } from '../../actions/chatLogs'
const ChatList = () => {
    const dispatch = useDispatch()
    const selectedWord = useSelector(state=>state.words)
    
   
    const chatLogs = useSelector(state => state.chatLogs)
    const logs = useSelector(state => state)
    useEffect(()=>{
      dispatch(loadChats())
    },[dispatch])
   
    const chatLogLis = chatLogs.map((chat)=>{
        if (chat.content){

            return (
                <li key={chat.id}>
                    
                    {chat.user_id}::{chat.content}
                </li>
            )
        }else {
            return <li>{chat}</li>
        }
    })
    return (
        <div>
            <ul>
            {chatLogLis}
            
            </ul>
            <button  onClick={()=> dispatch({type:"SELECTED_WORD"})}>{selectedWord}</button>
        </div>
    )
}

export default ChatList
