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
  drawLine: (line: Line) => void;
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
  // const canvasConnection = useSelector((state:any)=> state.connections.canvas)
  const context = React.useContext(GameContext) as GameContextProps
  const [isDrawing, setIsDrawing] = React.useState(false);
  const [ctx, setCtx] = React.useState<CanvasRenderingContext2D>();
  const [color, setColor] = useState('#ff0000');
  const [brushSize, setBrushSize] = useState(10);
  const players = useSelector((state:any)=> state.channels.activeUsers)
  const room  =  useSelector((state:any)=> state.channels.description)
  const turn  = players.length - (room.max_round - room.round)
  const socket = useSelector((state:any)=> state.connections.canvas)
  // host  = player.length - (max_round - round)
  if (players.length === room.max_round){
    if (players[room.round -1 ].username === session.user!.username){
      context.drawingPermission = true
    }

  }
  // React.useEffect(() => {
  //   if (ctx) {
  //     socket.perform('create', (line: Line) => {
  //       drawLine(line);
  //     });
  //     socket.recieved()
  //     // socket.on('drawingState', async (lines: Line[]) => {
  //     //   for (const line of lines) {
  //     //     drawLine(line);
  //     //     await waitFor(5);
  //     //   }
  //     // });
  //     // socket.on('roundStart', () => {
  //     //   ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);
  //     // });
  //   }
  // }, [ctx]);
  
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
    drawLine(newLine)
    socket.perform('create',{
      canvas: newLine
    })
 
    
 
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
  const drawLine = (line : Line) =>{
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
        drawLine
      }}
    >
      {props.children}
    </DrawingBoardContext.Provider>
  );
};

export default DrawingBoardProvider;
