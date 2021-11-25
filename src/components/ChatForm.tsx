import React from 'react';
const ChatForm: React.FC = () => {
  const [chatInput, setChatInput] = React.useState('');
  return (
    <form
      id="chatbox-form"
      onSubmit={(ev): void => {
        ev.preventDefault();
        // if (chatInput === '') {
        //   return;
        // }
        // socket.emit('chatMsg', { type: 'chat', msg: chatInput });
        // setChatInput('');
      }}
    >
      <input
        data-testid="chat-input"
        type="text"
        value={chatInput}
        onChange={(ev): void => setChatInput(ev.target.value)}
      />
    </form>
  );
};
export default ChatForm;