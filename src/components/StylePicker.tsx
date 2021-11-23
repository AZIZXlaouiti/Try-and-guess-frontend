import React, { useContext } from 'react';
import {
  DrawingBoardContext,
  DrawingBoardContextProps,
} from './DrawingBoardContext';
const StylePicker: React.FC = () => {
  const context = useContext(DrawingBoardContext) as DrawingBoardContextProps;
  return (
    <div id="stylepicker-container">
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
