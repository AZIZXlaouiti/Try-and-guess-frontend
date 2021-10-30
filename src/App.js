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

const App = () => {
  const [connection, setConnection] = useState(false);
  const session = useSelector(state => state.sessions)
  const dispatch = useDispatch()


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
      let cable = Cable.createConsumer("ws://localhost:3001/cable");
      const canvasConnection = cable.subscriptions.create(
        {
          channel: "SketchChannel",
        },
        {
          connected: () => {
            console.log("user connected")
          },
          received: async (data) => {
            dispatch(setLines(data))
            // console.log('recieved canvas',data)
          },
          create: (canvasContent) => {
            canvasConnection.perform("create", {
              canvas: canvasContent,
            });
          },
        }
      );
      const chatConnection = cable.subscriptions.create(
        {
          channel: "ChatChannel",
        },
        {
          connected: () => {
            // chatConnection.perform("appear",{
  
            // })
          },
          received: async (data) => {
            const resp = await JSON.parse(data);
            dispatch(setChats(resp.chat_messages))
          },
          create: (chatContent) => {
            chatConnection.perform("create", {
              content: chatContent,
            });
          },
        }
      );
    
      dispatch(setCanvasSubscription(canvasConnection))
      dispatch(setChatSubscription(chatConnection))
  
      setConnection(true);
    };

    if (!connection) {
      createSocket();
   
    }
  }, [connection , dispatch]);

  useEffect(()=>{
    const token = localStorage.getItem("token")
    if (token){
      dispatch(getCurrentUser(token))
    }
  },[])

  if (!session.loggedIn){
    return (
 
     <SessionFrom/>
    
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
            }}
          >
           logout
          </Link>
        <h1>Chat Message</h1>
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
