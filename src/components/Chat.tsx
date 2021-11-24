import React  , {useEffect} from 'react'
import { Cable } from 'actioncable'
import ActionCable from 'actioncable'
const Chat: React.FC = () => {
    useEffect(()=>{
        const cable  = ActionCable.createConsumer("ws://localhost:3001/cable")
        cable.subscriptions.create('ChatChannel',{
            connected():void{
                 console.log('connected')
            }
        })
        console.log('run') 
    },[])
   return (
       <div id="chatbox-container">

       </div> 
   )
}
export default Chat