import React  , {useEffect} from 'react'
import ActionCable from 'actioncable'
import ChatForm from './ChatForm'
import ChatMessages , { ChatMsg } from './ChatMessage'
const Chat: React.FC = () => {

    const [message , setMessage] = React.useState<ChatMsg[]>([])
    useEffect(()=>{
        const cable  = ActionCable.createConsumer("ws://localhost:3001/cable")
        cable.subscriptions.create('ChatChannel',{
            connected():void{
                 console.log('connected')
            },
            received :async(data)=> {
                  setMessage(data.chat_msg)
            }
        })
    },[]) 
   return (
       <div id="chatbox-container">
           <ChatMessages messages={message}/>
          <ChatForm/>
       </div> 
   )
}
export default Chat