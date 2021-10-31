import React , {useEffect}from 'react'
import { useDispatch , useSelector} from 'react-redux'
import { loadChats } from '../../actions/chatLogs'
const ChatList = () => {
    const dispatch = useDispatch()
    const chatLogs = useSelector(state => state.chatLogs)
    const logs = useSelector(state => state)
    console.log(logs,'logs')
    useEffect(()=>{
      dispatch(loadChats())
    },[dispatch])
    console.log(chatLogs , "chatlogs")
   
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
        </div>
    )
}

export default ChatList
