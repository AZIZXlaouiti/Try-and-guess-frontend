import React from 'react';
import DrawingBoardProvider from './DrawingBoardContext';
import DrawingBoard from './DrawingBoard';
import SessionForm from './sessionForm';
const App: React.FC = () => {
  return (
    <>
    <SessionForm/>
    {/* <DrawingBoardProvider>
    <DrawingBoard width={800} height={600}></DrawingBoard>
  </DrawingBoardProvider> */}
    </>
  );
};

export default App;
