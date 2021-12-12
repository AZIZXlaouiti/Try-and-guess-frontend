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
  const [reveal , setReEveal] = React.useState(false)
  const word = useSelector((state:any)=> state.channels.word)
  const room = useSelector((state:any)=> state.channels)
  const roomConnection = useSelector((state:any)=> state.connections.room)
  const chatConnection = useSelector((state:any)=> state.connections.chats)
  const session:SessionProp= useSelector((state:any)=> state.sessions)
  const players = room.activeUsers 
  const info = room.description 
  const chosenWord = info.chosen_word
  
  const roundTime = {
    timeToComplete:80,
    startTime:Date.now()
  }
  const pickRandomWord = (): void  =>{
    if (players.length === info.max_round){
      if (players[info.round -1 ].username === session.user!.username){ 
        const word = words[Math.floor(Math.random() * words.length)]
        roomConnection.perform("start",{
              word: word
        })
        setReEveal(true)
      }
      else {
        return
      }
  
    }
  }
  const encode = (word:string): string =>{
    let str = ''
      for (const value of word){
        if (value !== " "){
        str += "-"
        }else {
        str += ' '
         }
      }
   return str
  }
  const counter:number = useSelector((state:any)=> state.channels.description.counter)
  let draw = info.game_started?"none":""
  return (
    <>
      <div className='head' id="roundinfo-container">
      <button
          onClick={(ev):void => {
            ev.preventDefault();
            dispatch({ type: "LOGOUT" });
            localStorage.removeItem("token");
            roomConnection.unsubscribe()
            chatConnection.unsubscribe()
            chatConnection.perform("disconnect",{
              user:session.user!.username
          })
           }}
        > 
          logout
        </button>
        {counter?<Timer roundTime = {roundTime} isStart={info.game_started}/>:null}
        
        <div id="round-waiting"></div>
        <div id='round'>{`Round ${info.round }/3`}</div>
        <div id='currentword'>{players.length > 2 ? `${chosenWord?reveal?chosenWord:encode(chosenWord): 'waiting...' }`:`need 0${3-players.length} more player to start`}</div>
        <button  onClick={()=>pickRandomWord()} >start</button>
      </div>
    <div id="game-container">
      <ScoreBoard/>
    <div  >   
    <canvas 
       className='container cursor'
       ref={ref}
       width={props.width}
       height={props.height}
       onMouseDown={context.handleMouseDown}
       onMouseUp={context.handleMouseUp}
       onMouseMove={context.handleMouseMove}

       ></canvas>
       <div id="overlay">
         <div id="content"  style={{"display":draw}}>
           {word?  <h2>The word was {word}</h2>:<h2>waiting...</h2> }
         
           {players.map((e,i)=><div className='text' key={i}>{e.username}: {e.score} points</div>)}
         </div>
       </div>
     <StylePicker></StylePicker>
    </div>
      <Chat/>
           </div>
    </>

  );
};
export default DrawingBoard;
