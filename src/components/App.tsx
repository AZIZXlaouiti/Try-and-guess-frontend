import React  , {useEffect}from 'react';
import DrawingBoardProvider from './DrawingBoardContext';
import DrawingBoard from './DrawingBoard';
import SessionForm from './sessionForm';
import { useDispatch } from 'react-redux';
import { Dispatch } from 'react';
import { Link } from "@mui/material";
import { useSelector } from 'react-redux';
import { SessionProp } from '../reducers/type';
import { getCurrentUser } from './Auth';
const App: React.FC = () => {
  const dispatch:Dispatch<any> = useDispatch()
  const chat= useSelector((state:any)=> state.connections.chats)
  const room= useSelector((state:any)=> state.connections.room)
  const session:SessionProp= useSelector((state:any)=> state.sessions)
  const token = localStorage.getItem('token')
  useEffect(()=>{
    if (token) {
      dispatch(getCurrentUser(token));
    }
  },[])
  return (
    <>
    {session.user?<DrawingBoardProvider>
    
    <DrawingBoard width={800} height={600}></DrawingBoard>
  </DrawingBoardProvider> :<SessionForm/>}
    
     
    </>
  );
}; 

export default App;
