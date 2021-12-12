import React from 'react';
import { ChatMessageProps } from '../reducers/type';
const ChatMessages: React.FC<ChatMessageProps> = ({messages }) => {
  return (
    <div id="chatbox-messages">
      {messages.map(( {content , user:{username} , chat_type} , indx) => (
        <div
         key={indx}
          data-testid="chatbox-message"
          className={`msg-chat`}
        >
         {chat_type === 'good'?<b className={`msg-good`}>{`${username} guessed the word correctly`}</b>:<b>{username}: {content}</b> }
              
         
        </div>
      ))}
    </div>
  );
};
export default ChatMessages;