import React, { useState, useEffect, useRef } from "react";
import Cable from "actioncable";
import Canvas from "./canvas";
import DrawApp2 from "./DrawApp2";
import { useDispatch } from "react-redux";
import { setCanvasSubscription } from "./actions/connection";
import { setChatSubscription } from "./actions/connection";
import { setChats } from './actions/chatLogs';
import ChatForm from './components/static/ChatForm'
import ChatList from './components/static/ChatList'
const App = () => {
  const [connection, setConnection] = useState(false);
  const dispatch = useDispatch()
  
  

  const prev = useRef(null);
  const [lines, setLines] = useState([]);


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
          connected: () => {},
          received: async (data) => {
            // setLines(data);
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

  

  
 
  return (
    <div className="App">
    <div className='stage'>
        <h1>Chat Message</h1>
      
      <ChatList/>
      <ChatForm/>
      </div>
    </div>
  );
};

export default App;
