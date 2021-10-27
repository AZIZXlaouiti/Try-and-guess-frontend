import React, { useRef , useState } from 'react';
import { Stage, Layer, Line, Text } from 'react-konva';
import { useSelector , useDispatch } from 'react-redux';
import { setLines } from '../../actions/canvasLogs';
const Canvas = () => {
    const [tool, setTool] = useState('pen');
    const [currentLines , setCurrentLines] = useState([])
    const isDrawing = useRef(false);
    const canvas = useSelector(state=>state.connections.subscriptions.canvas)
    const canvasLogs = useSelector(state => state.canvasLogs)
    const dispatch = useDispatch()

    const handleSendCanvas = ()=>{
      canvas.create(canvasLogs)
    }
    const handleMouseDown = (e) => {
      isDrawing.current = true;
      let pos = e.target.getStage().getPointerPosition();
      dispatch(setLines([...canvasLogs, { tool, points: [pos.x, pos.y] }]))
    };
    
    const handleMouseMove = (e) => {
      // no drawing - skipping
      if (!isDrawing.current) {
        return;
      }
      let stage = e.target.getStage();
      let point = stage.getPointerPosition();
      let lastLine = canvasLogs[canvasLogs.length - 1];
      // add point
      lastLine.points = lastLine.points.concat([point.x, point.y]);
  
      // replace last
      canvasLogs.splice(canvasLogs.length - 1, 1, lastLine);
      dispatch(setLines(canvasLogs.concat()))
      handleSendCanvas()
    };
  
    const handleMouseUp = () => {
      isDrawing.current = false;
    };
    return (
        <>
        <Stage
        width={700} height={700}
        onMouseDown={handleMouseDown}
        onMousemove={handleMouseMove}
        onMouseup={handleMouseUp}
      
      >
        <Layer>
          <Text text="Just start drawing" x={5} y={30} />
          {canvasLogs.map((line, i) => (
            <Line
           
              key={i}
              points={line.points}
              stroke="blue"
              strokeWidth={10}
              tension={0.5}
              lineCap="round"
              globalCompositeOperation={
                line.tool === 'eraser' ? 'destination-out' : 'source-over'
              }
            />
          ))}
        </Layer>
      </Stage>
      <select
        value={tool}
        onChange={(e) => {
          setTool(e.target.value);
        }}
      >
        <option value="pen">Pen</option>
        <option value="eraser">Eraser</option>
      </select>
      <button >load</button>
      <button onClick={(e)=>setLines([])}>clear</button>

      
    </>
    )
}

export default Canvas
