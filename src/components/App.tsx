// import './styles/index.scss';
import React from 'react';

import DrawingBoardProvider from './DrawingBoardContext';
import DrawingBoard from './DrawingBoard';
const App: React.FC = () => {
  return (
    
    <DrawingBoardProvider>
      <DrawingBoard width={800} height={600}></DrawingBoard>
    </DrawingBoardProvider>
  );
};

export default App;
