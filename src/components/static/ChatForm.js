import React , {useState}from 'react'
import { useSelector  } from 'react-redux'
import { Button } from "@mui/material";
import { TextField } from '@mui/material';
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

        <TextField
          fullWidth
          autoComplete="username"
          type="username"
          label='Enter your message...'
          variant="outlined"
          value={ currentChatMessage }
          onChange={ updateCurrentChatMessage }
        />
        <Button
          fullWidth
          size="large"
          type="submit"
          variant="contained"
          disabled={true}
          onClick={()=>chats.start()}
        >
          Start Game
        </Button>
      </div>
    )
}

export default ChatForm
