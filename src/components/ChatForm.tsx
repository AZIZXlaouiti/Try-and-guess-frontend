import React from 'react';
import { useSelector } from 'react-redux';
const ChatForm: React.FC = () => {
  const [chatInput, setChatInput] = React.useState('');
  const chat= useSelector((state:any)=> state.connections.chats)
  return (
    <form
      id="chatbox-form"
      onSubmit={(ev): void => {
        ev.preventDefault();
        if (chatInput === '') {
          return;
        }
        chat.create(chatInput)
        setChatInput('');
      }}
    >
      <input
        data-testid="chat-input"
        type="text"
        value={chatInput}
        onChange={(ev): void => setChatInput(ev.target.value)}
      />
      <button type='submit'>submit</button>
    </form>
  );
};
export default ChatForm;