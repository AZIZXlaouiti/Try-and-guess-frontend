import React, { useState, useEffect  , useRef} from 'react';
import Cable from 'actioncable';
import CanvasDraw from 'react-canvas-draw';
import { ReactSketchCanvas } from 'react-sketch-canvas';
const App = () => {
  const [currentChatMessage, setCurrentChatMessage] = useState('')
  const [connection, setConnection ] = useState(false);
  const [chats, setChats] = useState({});
  const [chatLogs, setChatLogs] = useState([])
  const [canvas , setCanvas] = useState([])



    
  const prev = useRef(null)
  const sec = useRef(null)
  const styles = {
    border: '0.0625rem solid #9c9c9c',
    borderRadius: '0.25rem',
  };
  const handleClick = (e)=>{
   
  // console.log(e.target.name)
  if (e.target.name === 'clear'){
    prev.current.clearCanvas()
  }else if(e.target.name === 'undo') {
    prev.current.undo()
  }else if (e.target.name === 'load'){
    prev.current.loadPaths(canvas)
  }else {
    handleSendCanvas(prev.current.state.currentPaths)
    console.log("canvas brodcast",prev.current.state.currentPaths)
  }

} 
  const handleChange =(e)=>{
    const data = prev.current.getSaveData()
     console.log(JSON.parse(prev.current.getSaveData()))
    sec.current.loadSaveData(data , true)
  }
  const loadChats = () => {
    fetch('http://localhost:3001/chat_messages')
      .then(resp => resp.json())
      .then(data => setChatLogs(data))
  }
  const loadCanvas =()=>{
    fetch('http://localhost:3001/sketches')
      .then(resp => resp.json())
      .then(data => setCanvas(data))
  }


  useEffect(() => {
    if(!connection) {
      createSocket();
      loadChats();
      loadCanvas()
    }
  }, [connection])
  
  useEffect(()=>{
    
  },[])


  const updateCurrentChatMessage = (event) => {
    setCurrentChatMessage(event.target.value);
  }

  const handleSendEvent = (event) => {
    event.preventDefault();
    chats.create( currentChatMessage );
    setCurrentChatMessage('');
  }
  const handleSendCanvas = (currentCanvas) => {
    canvas.create(currentCanvas );
    // setCurrentChatMessage('');
  }

  const createSocket = () => {
    let cable = Cable.createConsumer('ws://localhost:3001/cable');
    //creating subscription to specific channel 
    const canvasConnection = cable.subscriptions.create({
      channel: 'SketchChannel'
    },{
      connected: ()=>{},
      received: async (data)=>{
        const resp = await JSON.parse(data);
         console.log('canvas_recieved',resp)
        // setCanvas(data.canvas)
      },
      create: (canvasContent)=>{
        canvasConnection.perform('create',{
           paths: canvasContent
        })
      }
    })
    const chatConnection = cable.subscriptions.create({
      channel: 'ChatChannel'
    }, {
      connected: () => {},
      received: async (data) => {
        const resp = await JSON.parse(data);
        setChatLogs(resp.chat_messages)
        // console.log(resp,'lines')
        // setChatLogs(chatLogCopy);
      },
      //sending changes to ws// used for rendering
      create: (chatContent) => {
        chatConnection.perform('create', {
          //calling the chat_channel create method
          content: chatContent
        });
      }
    });

    setChats(chatConnection)
    setConnection(true);
  }

  const chatLogLis = chatLogs.map((chat) => {
    return (
      <li key={ chat.id }>
        user says: { chat.content }
      </li>
    )
  })
  return (
    <div className='App'>
      <div className='stage'>
        <h1>Chat</h1>
        <div className='chat-logs'>
          <ul>
          { chatLogLis }
          </ul>
        </div>
        <input
          type='text'
          placeholder='Enter your message...'
          className='chat-input'
          value={ currentChatMessage }
          onChange={ updateCurrentChatMessage }
        />
        <button
          className='send'
          onClick={ handleSendEvent }
        >
          Send
        </button>
        <button onClick={handleClick} name='broadcast'>broadcast</button>
        <button onClick={handleClick} name='load'>load</button>
      <button onClick={handleClick} name='clear'>clear</button>
      <button onClick={handleClick} name='undo'>undo</button>
      <ReactSketchCanvas
      style={styles}
      width="800"
      height="600"
      strokeWidth={7}
      strokeColor="red"
      onUpdate={(e)=>console.log('canvas',e) }
      ref={prev}
      
      />
      </div>
      <div>
       {/* <SketchField width='1024px' 
                         height='768px' 
                         tool={Tools.Pencil} 
                         lineColor='black'
                         lineWidth={3}/> */}
    {/* <CanvasDraw brushRadius={5} lazyRadius={7}  canvasWidth={800} 
    canvasHeight={600} loadTimeOffset={8}  hideInterface={true} ref={prev} onChange={handleChange} immediateLoading={true} />
    <CanvasDraw brushRadius={5} lazyRadius={7}  canvasWidth={800} 
    canvasHeight={600} loadTimeOffset={8}  hideInterface={true} ref={sec} />
       */}
    </div>
    </div>
  );
}

export default App;