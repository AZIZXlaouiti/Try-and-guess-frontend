import React, { useContext } from 'react';
import {
  DrawingBoardContext,
  DrawingBoardContextProps,
} from './DrawingBoardContext';
const StylePicker: React.FC = () => {
  const [canvas , setCanvas] = React.useState([
    {
        "x": 146,
        "y": 115
    },
    {
        "x": 148,
        "y": 123
    },
    {
        "x": 150,
        "y": 134
    },
    {
        "x": 153,
        "y": 147
    },
    {
        "x": 156,
        "y": 164
    },
    {
        "x": 158,
        "y": 180
    },
    {
        "x": 161,
        "y": 194
    },
    {
        "x": 163,
        "y": 212
    },
    {
        "x": 165,
        "y": 229
    },
    {
        "x": 168,
        "y": 244
    },
    {
        "x": 170,
        "y": 257
    },
    {
        "x": 172,
        "y": 268
    },
    {
        "x": 173,
        "y": 275
    },
    {
        "x": 174,
        "y": 280
    },
    {
        "x": 175,
        "y": 284
    },
    {
        "x": 176,
        "y": 286
    }
]) 
  // const loadCanvas = ()=>{
  //   let start = 0
  //   while(start < canvas.length){
  //     context.load(canvas[start])
  //     start++
  //   }
  //   // context.clear()
  // }
  const context = useContext(DrawingBoardContext) as DrawingBoardContextProps;
  return (
    <div id="stylepicker-container" className='features'>
    <label htmlFor="color-picker">Brush color</label>
    <input
      id="color-picker"
      type="color"
      value={context.color}
      onChange={context.handleColorChange}
    />
    <label htmlFor="brush-size"> Brush size</label>
    <input
      id="brush-size"
      type="range"
      min={5}
      max={30}
      value={context.brushSize}
      onChange={context.handleBrushSizeChange}
    />
      <button 
     onClick={context.clear}
    
  >CLEAR</button>
  </div>
  );
};
export default StylePicker;
