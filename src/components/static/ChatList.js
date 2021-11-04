import React , {useEffect , useState }from 'react'
import { useDispatch , useSelector} from 'react-redux'
import { loadChats } from '../../actions/chatLogs'
import List from '@mui/material/List';
const ChatList = () => {
    const dispatch = useDispatch()
    const token = localStorage.getItem("token")
    const chatLogs = useSelector(state => state.chatLogs)
    useEffect(()=>{
      dispatch(loadChats())
    },[token])
    const chatLogLis = chatLogs.map((chat)=>{
      
         if (chat.content){
            
            return (
                
                <div key={chat.id}>
                    {chat.content}
                </div>
            )
            
        }else {
            return <div>{chat}</div>
        }
    })
    return (
 
  <ul>

      {chatLogLis}
  </ul>
    
   
    )
}

export default ChatList
