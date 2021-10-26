import React , {useEffect}from 'react'
import { useDispatch , useSelector} from 'react-redux'
import { loadChats } from '../../actions/chatLogs'
const ChatList = () => {
    const dispatch = useDispatch()
    const chatLogs = useSelector(state => state.chatLogs)

    
    useEffect(()=>{
      dispatch(loadChats())
    },[dispatch])


    const chatLogLis = chatLogs.map((chat)=>{
        return (
            <li key={chat.id}>
                user says: {chat.content}
            </li>
        )
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
