import React, { useLayoutEffect } from 'react';
import Chat from './Chat';
import {
  DrawingBoardContext,
  DrawingBoardContextProps,
} from './DrawingBoardContext';
import { ScoreBoard } from './ScoreBoard';
import StylePicker from './StylePicker';
const styles = {
  canvas: {
    border: '2px solid #333',
    margin:'20px 0px'
  },

  maindiv: {
    padding: "10px",
    margin: "auto",
    width: "800px",
  },

  button: {
    border: "0px",
    margin: "1px",
    height: "50px",
    minWidth: "75px",
  }


};
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
  return (
    <>
      <div className='head' id="roundinfo-container">
        <div id='timer' >42</div>
        <div id="round-waiting"></div>
        <div id='currentword'>waiting...</div>
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
