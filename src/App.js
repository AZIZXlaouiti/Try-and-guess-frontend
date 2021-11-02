import React, { useState, useEffect } from "react";
import Cable from "actioncable";
import Canvas from "./components/static/Canvas"
import { useDispatch, useSelector } from "react-redux";
import { setCanvasSubscription } from "./actions/connection";
import { setChatSubscription } from "./actions/connection";
import { setChats } from './actions/chatLogs';
import { setLines } from "./actions/canvasLogs";
import ChatForm from './components/static/ChatForm'
import ChatList from './components/static/ChatList'
import Timer from "./components/static/Timer";
import SessionFrom from "./components/sessions/sessionForm";
import { getCurrentUser } from "./components/sessions/auth";
import { Link } from "@mui/material";
import Words from "./components/static/Words";
import UserList from "./components/static/UserList";
import { CircularProgress } from '@mui/material';
const App = () => {
  const session = useSelector(state => state.sessions)
  const dispatch = useDispatch()
  const connection  = useSelector(state => state.connections.subscriptions)
  const token = localStorage.getItem("token")
  const selectedWord = useSelector(state=>state.words)

  const [state, setState] = useState({
    mode: "draw",
    pen: "up",
    lineWidth: 10,
    penColor: "black",
  });
  const styles = {
    border: "0.0625rem solid #9c9c9c",
    borderRadius: "0.25rem",
  };
  
  useEffect(() => {
    const createSocket = () => {
      const  cable = Cable.createConsumer("ws://localhost:3001/cable");
      const canvasConnection = cable.subscriptions.create(
        {
          channel: "SketchChannel",
        },
        {
          connected: () => {
            //
          },
          received: async (data) => {
            dispatch(setLines(data))
          },
          create: (canvasContent) => {
            canvasConnection.perform("create", {
              canvas: canvasContent,
            });
          },
        }
      );
      const wordConnection = cable.subscriptions.create(
        {
          channel: "wordChannel",
          user: session.currentUser.user.username
        },
        {
          connected: () => {
            //
          },
          received: async (data) => {
            console.log("word",data)
            // dispatch(setLines(data))
          }
        }
      );
      const chatConnection = cable.subscriptions.create(
        {
          channel: "ChatChannel",
          user: session.currentUser.user.username
        },
        {
          connected: () => {
          },
          received: async (data) => {
            if (data.join){
              dispatch({type:"ADD_USER",payload:{users:data.connected,turn:data.turn}})
              dispatch({type:"ADD_CHAT",payload:data.join})
              
            }else if (data.leave){
              dispatch({type:"ADD_USER",payload:{users:data.connected,turn:data.turn}})

              dispatch({type:"ADD_CHAT",payload:data.leave})
              
            }else if (data.word){
              dispatch({type:"SELECTED_WORD",payload:data.word.word})
            }
            
            else {
 
              const resp = await JSON.parse(data);
              dispatch({type:"ADD_CHAT",payload:resp.chat_messages})
              
            }
            
          },
          create: (chatContent) => {
            chatConnection.perform("create", {
              content: chatContent,
              user_id: session.currentUser.user.id
            });
          },
          start: ()=>{
            chatConnection.perform("start");
          }
        }
      );
    
      dispatch(setCanvasSubscription(canvasConnection))
      dispatch(setChatSubscription(chatConnection))
  
    };

    if (session.loggedIn) {
      createSocket();
   
    }
    
  }, [session.loggedIn , dispatch]);

  useEffect(()=>{
    
    if (token){
      dispatch(getCurrentUser(token))
    }
  },[])

  if (!session.loggedIn){
    dispatch({type:"RESET"})
    return (
      <>
     
     <SessionFrom/>
     

 </>
    )
  }
  return (
    <div className="App">
    <div className='stage'>
    <Link
            variant="subtitle2"
            underline="hover"
            component="button"
            onClick={(e)=>{
              e.preventDefault()
              dispatch({type:"LOGOUT"})
              localStorage.removeItem('token')
              connection.chats.unsubscribe({user: session.currentUser.user.username})
              connection.canvas.unsubscribe()

            }}
          >
           logout
          </Link>
        <h1>Chat Message</h1>
        <UserList/>
        <Words/>
        <Timer/>
      <Canvas/>
      <ChatList/>
      <ChatForm/>
      </div>
      <footer> <h4>Pen by mohamed aziz laouiti</h4></footer>
    </div>
  );
};

export default App;
