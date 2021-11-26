import React  , {useEffect}from 'react';
import DrawingBoardProvider from './DrawingBoardContext';
import DrawingBoard from './DrawingBoard';
import SessionForm from './sessionForm';
import { useDispatch } from 'react-redux';
import { Dispatch } from 'react';
import { Link } from "@mui/material";
import { useSelector } from 'react-redux';
import { User } from '../reducers/type'
import { SessionProp } from '../reducers/type';
import { getCurrentUser } from './Auth';
const App: React.FC = () => {
  const dispatch:Dispatch<any> = useDispatch()
  const session:SessionProp= useSelector((state:any)=> state.sessions)
  console.log('session',session)
  const token = localStorage.getItem('token')
  useEffect(()=>{
    if (token) {
      dispatch(getCurrentUser(token));
    }
  },[])
  return (
    <>
    {session.user?<DrawingBoardProvider>
      <Link
          variant="subtitle2"
          underline="hover"
          component="button"
          onClick={(e) => {
            e.preventDefault();
            dispatch({ type: "LOGOUT" });
            localStorage.removeItem("token");
          }}
        >
          logout
        </Link>
    <DrawingBoard width={800} height={600}></DrawingBoard>
  </DrawingBoardProvider> :<SessionForm/>}
    
     
    </>
  );
}; 

export default App;
