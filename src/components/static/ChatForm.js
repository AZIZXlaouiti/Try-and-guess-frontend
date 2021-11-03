import React , {useState}from 'react'
import { useSelector  } from 'react-redux'

const ChatForm = () => {
    const [currentChatMessage, setCurrentChatMessage] = useState('');
    const chats = useSelector(state => state.connections.subscriptions.chats);
    const word = useSelector(state => state.words)
    const updateCurrentChatMessage = (event) => {
      setCurrentChatMessage(event.target.value);
    }
  
    const handleSendEvent = (event) => {
      event.preventDefault();
      if (currentChatMessage !== ""){
        if (currentChatMessage.toLowerCase() === word){
           chats.guess()
        }else {
          chats.create( currentChatMessage );
        }
        setCurrentChatMessage('');
      }
    }
    
    return (
      <div>
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
        <button onClick={()=>chats.start()}>Start Game</button>
      </div>
    )
}

export default ChatForm
