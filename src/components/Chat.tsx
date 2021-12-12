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
    const arr = [
        {
          "x": 86,
          "y": 114,
          "color": "#ff0000",
          "brushSize": 10,
          "isEnding": false
        },
        {
          "x": 85,
          "y": 121,
          "color": "#ff0000",
          "brushSize": 10,
          "isEnding": false
        },
        {
          "x": 80,
          "y": 198,
          "color": "#ff0000",
          "brushSize": 10,
          "isEnding": false
        },
        {
          "x": 75,
          "y": 265,
          "color": "#ff0000",
          "brushSize": 10,
          "isEnding": false
        },
        {
          "x": 74,
          "y": 331,
          "color": "#ff0000",
          "brushSize": 10,
          "isEnding": false
        },
        {
          "x": 74,
          "y": 367,
          "color": "#ff0000",
          "brushSize": 10,
          "isEnding": false
        },
        {
          "x": 74,
          "y": 398,
          "color": "#ff0000",
          "brushSize": 10,
          "isEnding": false
        },
        {
          "x": 74,
          "y": 417,
          "color": "#ff0000",
          "brushSize": 10,
          "isEnding": false
        },
        {
          "x": 78,
          "y": 424,
          "color": "#ff0000",
          "brushSize": 10,
          "isEnding": false
        },
        {
          "x": 84,
          "y": 425,
          "color": "#ff0000",
          "brushSize": 10,
          "isEnding": false
        },
        {
          "x": 91,
          "y": 424,
          "color": "#ff0000",
          "brushSize": 10,
          "isEnding": false
        },
        {
          "x": 135,
          "y": 347,
          "color": "#ff0000",
          "brushSize": 10,
          "isEnding": false
        },
        {
          "x": 145,
          "y": 329,
          "color": "#ff0000",
          "brushSize": 10,
          "isEnding": false
        },
        {
          "x": 180,
          "y": 227,
          "color": "#ff0000",
          "brushSize": 10,
          "isEnding": false
        },
        {
          "x": 192,
          "y": 202,
          "color": "#ff0000",
          "brushSize": 10,
          "isEnding": false
        },
        {
          "x": 210,
          "y": 175,
          "color": "#ff0000",
          "brushSize": 10,
          "isEnding": false
        },
        {
          "x": 225,
          "y": 157,
          "color": "#ff0000",
          "brushSize": 10,
          "isEnding": false
        },
        {
          "x": 231,
          "y": 153,
          "color": "#ff0000",
          "brushSize": 10,
          "isEnding": false
        },
        {
          "x": 237,
          "y": 161,
          "color": "#ff0000",
          "brushSize": 10,
          "isEnding": false
        },
        {
          "x": 242,
          "y": 199,
          "color": "#ff0000",
          "brushSize": 10,
          "isEnding": false
        },
        {
          "x": 247,
          "y": 260,
          "color": "#ff0000",
          "brushSize": 10,
          "isEnding": false
        },
        {
          "x": 254,
          "y": 303,
          "color": "#ff0000",
          "brushSize": 10,
          "isEnding": false
        },
        {
          "x": 270,
          "y": 337,
          "color": "#ff0000",
          "brushSize": 10,
          "isEnding": false
        },
        {
          "x": 294,
          "y": 359,
          "color": "#ff0000",
          "brushSize": 10,
          "isEnding": false
        },
        {
          "x": 304,
          "y": 364,
          "color": "#ff0000",
          "brushSize": 10,
          "isEnding": false
        },
        {
          "x": 325,
          "y": 364,
          "color": "#ff0000",
          "brushSize": 10,
          "isEnding": false
        },
        {
          "x": 338,
          "y": 360,
          "color": "#ff0000",
          "brushSize": 10,
          "isEnding": false
        },
        {
          "x": 351,
          "y": 346,
          "color": "#ff0000",
          "brushSize": 10,
          "isEnding": false
        },
        {
          "x": 365,
          "y": 330,
          "color": "#ff0000",
          "brushSize": 10,
          "isEnding": false
        },
        {
          "x": 393,
          "y": 307,
          "color": "#ff0000",
          "brushSize": 10,
          "isEnding": false
        },
        {
          "x": 428,
          "y": 291,
          "color": "#ff0000",
          "brushSize": 10,
          "isEnding": false
        },
        {
          "x": 456,
          "y": 290,
          "color": "#ff0000",
          "brushSize": 10,
          "isEnding": false
        },
        {
          "x": 508,
          "y": 306,
          "color": "#ff0000",
          "brushSize": 10,
          "isEnding": false
        },
        {
          "x": 534,
          "y": 324,
          "color": "#ff0000",
          "brushSize": 10,
          "isEnding": false
        },
        {
          "x": 546,
          "y": 335,
          "color": "#ff0000",
          "brushSize": 10,
          "isEnding": false
        },
        {
          "x": 552,
          "y": 346,
          "color": "#ff0000",
          "brushSize": 10,
          "isEnding": false
        },
        {
          "x": 551,
          "y": 347,
          "color": "#ff0000",
          "brushSize": 10,
          "isEnding": false
        },
        {
          "x": 551,
          "y": 347,
          "color": "#ff0000",
          "brushSize": 10,
          "isEnding": false
        },
        {
          "x": 345,
          "y": 129,
          "color": "#ff0000",
          "brushSize": 10,
          "isEnding": false
        },
        {
          "x": 326,
          "y": 205,
          "color": "#ff0000",
          "brushSize": 10,
          "isEnding": false
        },
        {
          "x": 316,
          "y": 248,
          "color": "#ff0000",
          "brushSize": 10,
          "isEnding": false
        },
        {
          "x": 308,
          "y": 293,
          "color": "#ff0000",
          "brushSize": 10,
          "isEnding": false
        },
        {
          "x": 301,
          "y": 317,
          "color": "#ff0000",
          "brushSize": 10,
          "isEnding": false
        },
        {
          "x": 300,
          "y": 353,
          "color": "#ff0000",
          "brushSize": 10,
          "isEnding": false
        },
        {
          "x": 300,
          "y": 360,
          "color": "#ff0000",
          "brushSize": 10,
          "isEnding": false
        },
        {
          "x": 300,
          "y": 361,
          "color": "#ff0000",
          "brushSize": 10,
          "isEnding": false
        },
        {
          "x": 305,
          "y": 363,
          "color": "#ff0000",
          "brushSize": 10,
          "isEnding": false
        },
        {
          "x": 324,
          "y": 354,
          "color": "#ff0000",
          "brushSize": 10,
          "isEnding": false
        },
        {
          "x": 338,
          "y": 332,
          "color": "#ff0000",
          "brushSize": 10,
          "isEnding": false
        },
        {
          "x": 350,
          "y": 315,
          "color": "#ff0000",
          "brushSize": 10,
          "isEnding": false
        },
        {
          "x": 383,
          "y": 274,
          "color": "#ff0000",
          "brushSize": 10,
          "isEnding": false
        },
        {
          "x": 402,
          "y": 251,
          "color": "#ff0000",
          "brushSize": 10,
          "isEnding": false
        },
        {
          "x": 421,
          "y": 237,
          "color": "#ff0000",
          "brushSize": 10,
          "isEnding": false
        },
        {
          "x": 434,
          "y": 238,
          "color": "#ff0000",
          "brushSize": 10,
          "isEnding": false
        },
        {
          "x": 447,
          "y": 266,
          "color": "#ff0000",
          "brushSize": 10,
          "isEnding": false
        },
        {
          "x": 460,
          "y": 324,
          "color": "#ff0000",
          "brushSize": 10,
          "isEnding": false
        },
        {
          "x": 472,
          "y": 379,
          "color": "#ff0000",
          "brushSize": 10,
          "isEnding": false
        },
        {
          "x": 478,
          "y": 397,
          "color": "#ff0000",
          "brushSize": 10,
          "isEnding": false
        },
        {
          "x": 489,
          "y": 420,
          "color": "#ff0000",
          "brushSize": 10,
          "isEnding": false
        },
        {
          "x": 501,
          "y": 424,
          "color": "#ff0000",
          "brushSize": 10,
          "isEnding": false
        },
        {
          "x": 514,
          "y": 423,
          "color": "#ff0000",
          "brushSize": 10,
          "isEnding": false
        },
        {
          "x": 532,
          "y": 410,
          "color": "#ff0000",
          "brushSize": 10,
          "isEnding": false
        },
        {
          "x": 545,
          "y": 395,
          "color": "#ff0000",
          "brushSize": 10,
          "isEnding": false
        },
        {
          "x": 557,
          "y": 375,
          "color": "#ff0000",
          "brushSize": 10,
          "isEnding": false
        },
        {
          "x": 569,
          "y": 352,
          "color": "#ff0000",
          "brushSize": 10,
          "isEnding": false
        },
        {
          "x": 573,
          "y": 346,
          "color": "#ff0000",
          "brushSize": 10,
          "isEnding": false
        },
        {
          "x": 576,
          "y": 344,
          "color": "#ff0000",
          "brushSize": 10,
          "isEnding": false
        },
        {
          "x": 589,
          "y": 360,
          "color": "#ff0000",
          "brushSize": 10,
          "isEnding": false
        },
        {
          "x": 604,
          "y": 388,
          "color": "#ff0000",
          "brushSize": 10,
          "isEnding": false
        },
        {
          "x": 622,
          "y": 418,
          "color": "#ff0000",
          "brushSize": 10,
          "isEnding": false
        },
        {
          "x": 631,
          "y": 430,
          "color": "#ff0000",
          "brushSize": 10,
          "isEnding": false
        },
        {
          "x": 638,
          "y": 436,
          "color": "#ff0000",
          "brushSize": 10,
          "isEnding": false
        },
        {
          "x": 651,
          "y": 438,
          "color": "#ff0000",
          "brushSize": 10,
          "isEnding": false
        },
        {
          "x": 676,
          "y": 421,
          "color": "#ff0000",
          "brushSize": 10,
          "isEnding": false
        },
        {
          "x": 677,
          "y": 419,
          "color": "#ff0000",
          "brushSize": 10,
          "isEnding": false
        },
        {
          "x": 677,
          "y": 419,
          "color": "#ff0000",
          "brushSize": 10,
          "isEnding": false
        },
        {
          "x": 458,
          "y": 227,
          "color": "#ff0000",
          "brushSize": 10,
          "isEnding": false
        },
        {
          "x": 458,
          "y": 253,
          "color": "#ff0000",
          "brushSize": 10,
          "isEnding": false
        },
        {
          "x": 459,
          "y": 264,
          "color": "#ff0000",
          "brushSize": 10,
          "isEnding": false
        },
        {
          "x": 474,
          "y": 277,
          "color": "#ff0000",
          "brushSize": 10,
          "isEnding": false
        },
        {
          "x": 480,
          "y": 279,
          "color": "#ff0000",
          "brushSize": 10,
          "isEnding": false
        },
        {
          "x": 578,
          "y": 240,
          "color": "#ff0000",
          "brushSize": 10,
          "isEnding": false
        },
        {
          "x": 581,
          "y": 237,
          "color": "#ff0000",
          "brushSize": 10,
          "isEnding": false
        },
        {
          "x": 588,
          "y": 233,
          "color": "#ff0000",
          "brushSize": 10,
          "isEnding": false
        },
        {
          "x": 592,
          "y": 231,
          "color": "#ff0000",
          "brushSize": 10,
          "isEnding": false
        },
        {
          "x": 594,
          "y": 232,
          "color": "#ff0000",
          "brushSize": 10,
          "isEnding": false
        },
        {
          "x": 625,
          "y": 295,
          "color": "#ff0000",
          "brushSize": 10,
          "isEnding": false
        },
        {
          "x": 633,
          "y": 298,
          "color": "#ff0000",
          "brushSize": 10,
          "isEnding": false
        },
        {
          "x": 633,
          "y": 298,
          "color": "#ff0000",
          "brushSize": 10,
          "isEnding": false
        },
        {
          "x": 119,
          "y": 207,
          "color": "#ff0000",
          "brushSize": 10,
          "isEnding": false
        },
        {
          "x": 119,
          "y": 221,
          "color": "#ff0000",
          "brushSize": 10,
          "isEnding": false
        },
        {
          "x": 119,
          "y": 230,
          "color": "#ff0000",
          "brushSize": 10,
          "isEnding": false
        },
        {
          "x": 119,
          "y": 249,
          "color": "#ff0000",
          "brushSize": 10,
          "isEnding": false
        },
        {
          "x": 119,
          "y": 257,
          "color": "#ff0000",
          "brushSize": 10,
          "isEnding": false
        },
        {
          "x": 122,
          "y": 265,
          "color": "#ff0000",
          "brushSize": 10,
          "isEnding": false
        },
        {
          "x": 127,
          "y": 269,
          "color": "#ff0000",
          "brushSize": 10,
          "isEnding": false
        },
        {
          "x": 136,
          "y": 272,
          "color": "#ff0000",
          "brushSize": 10,
          "isEnding": false
        },
        {
          "x": 145,
          "y": 272,
          "color": "#ff0000",
          "brushSize": 10,
          "isEnding": false
        },
        {
          "x": 151,
          "y": 272,
          "color": "#ff0000",
          "brushSize": 10,
          "isEnding": false
        },
        {
          "x": 183,
          "y": 260,
          "color": "#ff0000",
          "brushSize": 10,
          "isEnding": false
        },
        {
          "x": 185,
          "y": 264,
          "color": "#ff0000",
          "brushSize": 10,
          "isEnding": false
        },
        {
          "x": 223,
          "y": 278,
          "color": "#ff0000",
          "brushSize": 10,
          "isEnding": false
        },
        {
          "x": 187,
          "y": 268,
          "color": "#ff0000",
          "brushSize": 10,
          "isEnding": false
        },
        {
          "x": 225,
          "y": 278,
          "color": "#ff0000",
          "brushSize": 10,
          "isEnding": false
        },
        {
          "x": 227,
          "y": 278,
          "color": "#ff0000",
          "brushSize": 10,
          "isEnding": false
        },
        {
          "x": 228,
          "y": 278,
          "color": "#ff0000",
          "brushSize": 10,
          "isEnding": false
        },
        {
          "x": 228,
          "y": 278,
          "color": "#ff0000",
          "brushSize": 10,
          "isEnding": false
        }
      ]
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
                }, 
                isGuessed: (chatContent:ChatMsg[]) => {
                    chatConnection.perform("create", {
                    content: chatContent,
                    user_id: session.user?.id,
                    chat_type: "good"
                  });
                },
                
              
           
              
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
                    received :async({canvas})=> {
                        console.log("canvas" , canvas)
                        // context.drawLine(canvas)
                        
                        arr.push(canvas)
                        // console.log("canvas arr",arr)
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
           <button onClick={()=>{
               for (const line of arr) {
                context.drawLine(line);
              }
           }}>load</button>
           <ChatMessages messages={message}/>
          <ChatForm/>
       </div> 
   )
}
export default Chat