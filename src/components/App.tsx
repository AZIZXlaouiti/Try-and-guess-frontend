import React from 'react';
import DrawingBoardProvider from './DrawingBoardContext';
import DrawingBoard from './DrawingBoard';
import SessionForm from './sessionForm';
import { useSelector } from 'react-redux';
import { User } from '../reducers/type'
import { SessionProp } from '../reducers/type';

const App: React.FC = () => {
  // const session= useSelector<RootState , string>(state=> state.sessions)
  const token = localStorage.getItem('token')
  return (
    <>
    {token?<DrawingBoardProvider>
    <DrawingBoard width={800} height={600}></DrawingBoard>
  </DrawingBoardProvider> :<SessionForm/>}
    
     
    </>
  );
}; 

export default App;
