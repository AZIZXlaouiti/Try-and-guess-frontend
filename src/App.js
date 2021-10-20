import React, { useState, useEffect  , useRef} from 'react';
import Cable from 'actioncable';
import CanvasDraw from 'react-canvas-draw';
const App = () => {
  const [currentChatMessage, setCurrentChatMessage] = useState('')
  const [connection, setConnection ] = useState(false);
  const [chats, setChats] = useState({});
  const [chatLogs, setChatLogs] = useState([])
  const prev = useRef(null)
  const sec = useRef(null)
  const handleClick = (e)=>{
  // console.log(e.target.name)
  if (e.target.name === 'clear'){
    prev.current.clear()
  }else if(e.target.name === 'undo') {
    prev.current.undo()
  }

} 
  const handleChange =(e)=>{
    const data = prev.current.getSaveData()
     console.log(prev.current.getSaveData())
    sec.current.loadSaveData(data , true)
  }
  const loadChats = () => {
    fetch('http://localhost:3001/chat_messages')
      .then(resp => resp.json())
      .then(data => setChatLogs(data))
  }

  useEffect(() => {
    if(!connection) {
      createSocket();
      loadChats();
    }
  }, [connection])

  const updateCurrentChatMessage = (event) => {
    setCurrentChatMessage(event.target.value);
  }

  const handleSendEvent = (event) => {
    event.preventDefault();
    chats.create( currentChatMessage );
    setCurrentChatMessage('');
  }

  const createSocket = () => {
    let cable = Cable.createConsumer('ws://localhost:3001/cable');
    //creating subscription to specific channel 
    const chatConnection = cable.subscriptions.create({
      channel: 'ChatChannel'
    }, {
      connected: () => {},
      received: async (data) => {
        const resp = await JSON.parse(data);
        setChatLogs(resp.chat_messages)
        console.log(data,'recieved')
        // setChatLogs(chatLogCopy);
      },
      //sending changes to ws// used for rendering
      create: (chatContent) => {
        chatConnection.perform('create', {
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
      </div>
      <div>
      <button onClick={handleClick} name='clear'>clear</button>
      <button onClick={handleClick} name='undo'>undo</button>
    <CanvasDraw brushRadius={5} lazyRadius={7}  canvasWidth={800} 
    canvasHeight={600} loadTimeOffset={8}  hideInterface={true} ref={prev} onChange={handleChange}/>
    <CanvasDraw brushRadius={5} lazyRadius={7}  canvasWidth={800} 
    canvasHeight={600} loadTimeOffset={8}  hideInterface={true} ref={sec} />
      
    </div>
    </div>
  );
}

export default App;