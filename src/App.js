import React, { useState, useEffect, useRef } from "react";
import Cable from "actioncable";
import CanvasDraw from "react-canvas-draw";
import { ReactSketchCanvas } from "react-sketch-canvas";
import Canvas from "./canvas";
import DrawApp2 from "./DrawApp2";
import CanvasFreeDrawing from "canvas-free-drawing";
const App = () => {
  const [currentChatMessage, setCurrentChatMessage] = useState("");
  const [connection, setConnection] = useState(false);
  const [chats, setChats] = useState({});
  const [chatLogs, setChatLogs] = useState([]);
  const [canvas, setCanvas] = useState([]);
  const [testCanvas, setTestCanvas] = useState([]);
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
  const handleClick = (e) => {
    // console.log(e.target.name)
    if (e.target.name === "clear") {
      prev.current.clearCanvas();
    } else if (e.target.name === "undo") {
      prev.current.undo();
    } else if (e.target.name === "load") {
      prev.current.loadPaths(testCanvas);
      console.log("test", testCanvas);
    } else {
      handleSendCanvas(lines);
      // console.log("canvas brodcast", prev.current.state.currentPaths);
    }
  };

  const loadChats = () => {
    fetch("http://localhost:3001/chat_messages")
      .then((resp) => resp.json())
      .then((data) => setChatLogs(data));
  };
  const loadCanvas = async () => {
    const resp = await fetch("http://localhost:3001/sketches");
    const data = await resp.json();
    setTestCanvas(data);
    prev.current.loadPaths(testCanvas);
    console.log("prev", prev.current.currentPaths);
  };

  useEffect(() => {
    if (!connection) {
      createSocket();
      loadChats();
      // loadCanvas()
    }
  }, [connection]);

  const updateCurrentChatMessage = (event) => {
    setCurrentChatMessage(event.target.value);
  };

  const handleSendEvent = (event) => {
    event.preventDefault();
    chats.create(currentChatMessage);
    setCurrentChatMessage("");
  };
  const handleSendCanvas = (currentCanvas) => {
    canvas.create(currentCanvas);
    // lines.create(currentCanvas)s
  };

  const createSocket = () => {
    let cable = Cable.createConsumer("ws://localhost:3001/cable");
    //creating subscription to specific channel
    const canvasConnection = cable.subscriptions.create(
      {
        channel: "SketchChannel",
      },
      {
        connected: () => {},
        received: async (data) => {
          // setTestCanvas(data)
          // prev.current.loadPaths(data);
          setLines(data);
          // const resp = await JSON.parse(data);
          console.log("canvas_recieved", data);
          // setCanvas(data.canvas)
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
          setChatLogs(resp.chat_messages);
        },
        //sending changes to ws// used for rendering
        create: (chatContent) => {
          chatConnection.perform("create", {
            //calling the chat_channel create method
            content: chatContent,
          });
        },
      }
    );
    setCanvas(canvasConnection);
    setChats(chatConnection);
    setConnection(true);
  };
  const chatLogLis = chatLogs.map((chat) => {
    return <li key={chat.id}>user says: {chat.content}</li>;
  });
  console.log("hey");
  return (
    <div className="App">
      <div className="stage">
        <h1>Chat</h1>
        <div className="chat-logs">
          <ul>{chatLogLis}</ul>
        </div>
        <input
          type="text"
          placeholder="Enter your message..."
          className="chat-input"
          value={currentChatMessage}
          onChange={updateCurrentChatMessage}
        />
        <button className="send" onClick={handleSendEvent}>
          Send
        </button>

        <button onClick={handleClick} name="load">
          load
        </button>
        <button onClick={handleClick} name="clear">
          clear
        </button>
        <button onClick={handleClick} name="undo">
          undo
        </button>
        <button onClick={handleClick} name="broadcast">
          broadcast
        </button>
      </div>
    
      <Canvas
        lines={lines}
        setLines={setLines}
        handleSendCanvas={handleSendCanvas}
      />
      <DrawApp2 setState={setState} state={state}/>
    </div>
  );
};

export default App;
