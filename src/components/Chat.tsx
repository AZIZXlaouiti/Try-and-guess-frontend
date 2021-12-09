import React  , {useEffect , useContext} from 'react'
import {
    DrawingBoardContext,
    DrawingBoardContextProps,
  } from './DrawingBoardContext';
import ActionCable from 'actioncable'
import ChatForm from './ChatForm'
import ChatMessages  from './ChatMessage'
import { ChatMsg } from '../reducers/type'
import { useSelector } from 'react-redux';
import { SessionProp } from '../reducers/type';
import { useDispatch } from 'react-redux';
import { Dispatch } from 'react';
const Chat: React.FC = () => {
    const url = process.env.REACT_APP_URL
    const dispatch:Dispatch<any> = useDispatch()
    const [message , setMessage] = React.useState<ChatMsg[]>([])
    const [canvas , setCanvas] = React.useState<[]>([])
    const context = useContext(DrawingBoardContext) as DrawingBoardContextProps;
    const session:SessionProp= useSelector((state:any)=> state.sessions)
    const cable  = ActionCable.createConsumer(`ws://${url}/cable`)
    useEffect(()=>{
        const createSocket=():void=>{
        
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
            const roomConnection = cable.subscriptions.create({
                channel:'RoomChannel',
                member:session.user!
                
            },{
                connected():void{
                },
                received :async(data)=> {
                    if ("word" in  data){
                        dispatch({type:"ROOM_DESCRIPTION",payload:data.word});
                    }
                    else if  ("counter" in data){
                        dispatch({type:"ROOM_DESCRIPTION",payload:data.counter});
                        return 
                    }else {

                        dispatch({type:"SET_ACTIVE_ROOM_USER",payload:data.members});
                        dispatch({type:"ROOM_DESCRIPTION",payload:data.room});
                    }
                }
              
                
            })
            const canvasConnection = cable.subscriptions.create('SketchChannel',{
                    connected():void{
                    },
                    received :async(data)=> {
                        console.log("canvas" , data.canvas)
                        context.load(data.canvas)
                        
                        // dispatch({type:"SET_CANVAS_LOGS",payload:data.canvas});
                        
                    }
            })
             
        dispatch({type:"SET_CHAT_SUBSCRIPTION",payload:chatConnection});
        dispatch({type:"SET_ROOM_SUBSCRIPTION",payload:roomConnection});
        dispatch({type:"SET_CANVAS_SUBSCRIPTION",payload:canvasConnection});
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