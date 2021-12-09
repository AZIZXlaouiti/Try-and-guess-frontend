import React, { useState } from 'react';
import { SessionProp } from '../reducers/type';
import { useSelector } from 'react-redux';
interface DrawingBoardProviderProps {
  children: React.ReactNode;
}
export interface Line {
  x: number;
  y: number;
  color: string;
  brushSize: number;
  isEnding: boolean;
}
type BoardEvent = React.MouseEvent<HTMLCanvasElement, MouseEvent>;
type PickerEvent = React.ChangeEvent<HTMLInputElement>;
export interface DrawingBoardContextProps {
  isDrawing: boolean;
  setIsDrawing: (newVal: boolean) => void;
  handleMouseMove: (ev: BoardEvent) => void;
  handleMouseUp: (ev: BoardEvent) => void;
  handleMouseDown: (ev: BoardEvent) => void;
  ctx: CanvasRenderingContext2D;
  setCtx: (ctx: CanvasRenderingContext2D) => void;
  color: string;
  handleColorChange: (ev: PickerEvent) => void;
  brushSize: number;
  handleBrushSizeChange: (ev: PickerEvent) => void;
  clear: () => void;
  load: (line: Line) => void;
}
export interface GameContextProps {
  drawingPermission: boolean;
}
const GameContext = React.createContext<Partial<GameContextProps>>({});
export const DrawingBoardContext = React.createContext<
  Partial<DrawingBoardContextProps>
>({});

const DrawingBoardProvider = (
  props: DrawingBoardProviderProps
): JSX.Element => {
  const session:SessionProp= useSelector((state:any)=> state.sessions)
  const canvasConnection = useSelector((state:any)=> state.connections.canvas)
  const context = React.useContext(GameContext)
  const [isDrawing, setIsDrawing] = React.useState(false);
  const [ctx, setCtx] = React.useState<CanvasRenderingContext2D>();
  const [color, setColor] = useState('#ff0000');
  const [brushSize, setBrushSize] = useState(10);
  
  if (session.user!.username === 'john'){
    context.drawingPermission = true
  }
 
  const draw = (ev: BoardEvent ,isEnding = false ) => {
    if (!ctx || !isDrawing || !context.drawingPermission) {
      return;
    }
    const newLine = {
      x: ev.clientX - ctx.canvas.offsetLeft,
      y: ev.clientY - ctx.canvas.offsetTop,
      color,
      brushSize,
      isEnding
    };
    load(newLine)
    canvasConnection.perform('create',{
      canvas: newLine
    })
    // setCanvas([...canvas,newLine])
    // console.log("canvass arr" , canvas)
  };
  const handleMouseMove = (ev: BoardEvent): void => {
    draw(ev);
  };
  const handleMouseDown = (ev: BoardEvent): void => {
    setIsDrawing(true);
    draw(ev);
  };
  const handleMouseUp = (ev: BoardEvent): void => {
    setIsDrawing(false);
    draw(ev);
    ctx?.beginPath();

  };
  const handleColorChange = (ev: PickerEvent): void => {
    setColor(ev.target.value);
  };
  const handleBrushSizeChange = (ev: PickerEvent): void => {
    setBrushSize(parseInt(ev.target.value));
  };
  const clear = (): void =>{
    ctx!.fillStyle = "white" ;
    ctx?.clearRect(0, 0, 800, 600)
    ctx?.fillRect(0, 0, 800, 600);
  };
  const load = (line : Line): void =>{
    if (!ctx) {
      return;
    }
    ctx.strokeStyle = line.color;
    ctx.lineWidth = line.brushSize;
    ctx.lineTo(line.x, line.y);
    ctx.stroke();
    if (line.isEnding) {
      ctx.beginPath();
    }
  }

  return (
    <DrawingBoardContext.Provider
      value={{
        isDrawing,
        setIsDrawing,
        setCtx,
        ctx,
        handleMouseMove,
        handleMouseDown,
        handleMouseUp,
        color,
        brushSize,
        handleBrushSizeChange,
        handleColorChange,
        clear,
        load
      }}
    >
      {props.children}
    </DrawingBoardContext.Provider>
  );
};

export default DrawingBoardProvider;
