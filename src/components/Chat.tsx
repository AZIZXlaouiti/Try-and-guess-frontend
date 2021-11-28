import React  , {useEffect} from 'react'
import ActionCable from 'actioncable'
import ChatForm from './ChatForm'
import ChatMessages , { ChatMsg } from './ChatMessage'
import { useSelector } from 'react-redux';
import { SessionProp } from '../reducers/type';
import { useDispatch } from 'react-redux';
import { Dispatch } from 'react';
const Chat: React.FC = () => {
    const url = process.env.BASE_URL||'localhost:3001'
    const dispatch:Dispatch<any> = useDispatch()
    const [message , setMessage] = React.useState<ChatMsg[]>([])
    const session:SessionProp= useSelector((state:any)=> state.sessions)
    useEffect(()=>{
        const createSocket=():void=>{
        
            const cable  = ActionCable.createConsumer(`ws://${url}/cable`)
            const chatConnection = cable.subscriptions.create('ChatChannel',{
                connected():void{
                },
                received :async(data)=> {
                      setMessage(data.chat_msg)
                },
                create: (chatContent:ChatMsg[]) => {
                    chatConnection.perform("create", {
                    content: chatContent,
                    user_id: session.user?.id
                  });
                }
        })
        dispatch({type:"SET_CHAT_SUBSCRIPTION",payload:chatConnection});
        }
    if (session.user){
       createSocket()
    }
},[])   
   return (
       <div id="chatbox-container">
           <ChatMessages messages={message}/>
          <ChatForm/>
       </div> 
   )
}
export default Chat