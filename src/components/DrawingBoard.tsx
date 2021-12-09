import React, { useLayoutEffect  } from 'react';
import { useSelector } from 'react-redux'
import Chat from './Chat';
import { words } from './words';
import {
  DrawingBoardContext,
  DrawingBoardContextProps,
} from './DrawingBoardContext';
import { ScoreBoard } from './ScoreBoard';
import StylePicker from './StylePicker';
import Timer from './Timer';

import { SessionProp } from '../reducers/type';
import { useDispatch } from 'react-redux';
import { Dispatch } from 'react';
interface DrawingBoardProps {
  width: number;
  height: number;
}

const DrawingBoard: React.FC<DrawingBoardProps> = (props) => {
  const context = React.useContext(
    DrawingBoardContext
  ) as DrawingBoardContextProps;
  const ref = React.useRef<HTMLCanvasElement>(null);
  useLayoutEffect(() => {
    const canvas = ref.current as HTMLCanvasElement;
    canvas.height = props.height;
    canvas.width = props.width;
    const ctx = canvas.getContext('2d') as CanvasRenderingContext2D; 
    ctx.lineWidth = context.brushSize;
    ctx.lineCap = 'round';
    context.setCtx(ctx);
  }, []);
  const dispatch:Dispatch<any> = useDispatch()
  const room = useSelector((state:any)=> state.channels)
  const session:SessionProp= useSelector((state:any)=> state.sessions)
  const players = room.activeUsers 
  const info = room.description 
  const roundTime = {
    timeToComplete:80,
    startTime:Date.now()
  }
  const pickRandomWord = (): void  =>{
    if (players.length === info.max_round){
      if (players[info.round -1 ].username === session.user!.username){
        dispatch({type:"SET_CHOSEN_WORD",payload:words[Math.floor(Math.random() * words.length)]});
      }
  
    }
  }
  const counter:number = useSelector((state:any)=> state.channels.description.counter)
 
  return (
    <>
      <div className='head' id="roundinfo-container">
        {counter?<Timer roundTime = {roundTime}/>:null}
        
        <div id="round-waiting"></div>
        <div id='round'>{`Round ${info.round }/3`}</div>
        <div id='currentword'>{players.length > 2 ? 'match is about to start':`need 0${3-players.length} more player to start`}</div>
        <button  onClick={()=>pickRandomWord()} >start</button>
      </div>
    <div id="game-container">
      <ScoreBoard/>
    <div  >
    <canvas 
       className='container'
       ref={ref}
       width={props.width}
       height={props.height}
       onMouseDown={context.handleMouseDown}
       onMouseUp={context.handleMouseUp}
       onMouseMove={context.handleMouseMove}
       ></canvas>
     <StylePicker></StylePicker>
    </div>
      <Chat/>
           </div>
    </>

  );
};
export default DrawingBoard;
