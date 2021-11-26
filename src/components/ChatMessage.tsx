import React from 'react';
export type ChatMsg = { content: string; online: boolean; user:{username: string }};
interface ChatMessageProps {
  messages: ChatMsg[];
}
const ChatMessages: React.FC<ChatMessageProps> = ({messages }) => {
  return (
    <div id="chatbox-messages">
      {messages.map(( {content , user:{username}} , indx) => (
        <div
         key={indx}
          data-testid="chatbox-message"
          className={`msg-good`}
        >
       
              <b>{username}:</b> {content}
         
        </div>
      ))}
    </div>
  );
};
export default ChatMessages;