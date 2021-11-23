import React, { useLayoutEffect } from 'react';
import {
  DrawingBoardContext,
  DrawingBoardContextProps,
} from './DrawingBoardContext';
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
    <div style={styles.maindiv}>
    <canvas
      ref={ref}
      width={props.width}
      height={props.height}
      onMouseDown={context.handleMouseDown}
      onMouseUp={context.handleMouseUp}
      onMouseMove={context.handleMouseMove}
    ></canvas>
     <button 
     onClick={context.clear}
    
  >CLEAR</button>
      </div>
  );
};
export default DrawingBoard;
