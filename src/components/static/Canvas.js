import React, { useRef , useState } from 'react';
import { Stage, Layer, Line, Text } from 'react-konva';
import { useSelector , useDispatch } from 'react-redux';
import { clearCanvas, setLines } from '../../actions/canvasLogs';
import { Paper } from '@mui/material';
import { Box } from '@mui/system';
import useMeasure from 'react-use-measure'
const Canvas = () => {
    const [tool, setTool] = useState('pen');
    const [ref, bounds] = useMeasure()
    const session = useSelector(state=>state.sessions)
    const isDrawing = useRef(false);
    const canvas = useSelector(state=>state.connections.subscriptions.canvas)
    const canvasLogs = useSelector(state => state.canvasLogs)
    const dispatch = useDispatch()
    if (!session.currentUser.user.username === session.turn.username){
      isDrawing.current = false
    }
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
      <Box
      sx={{
        display: 'flex',
        flexWrap: 'wrap',
        '& > :not(style)': {
          m: 1,
          width: 128,
          height: 128,
        },
      }}
    >
     <Paper variant="outlined" ref={ref} >
        <Stage
        width={bounds.width} height={bounds.height} 
        onMouseDown={handleMouseDown}
        onMousemove={handleMouseMove}
        onMouseup={handleMouseUp}
        className="cursor-not-allowed"
        disabled
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
      <button onClick={(e)=>dispatch(clearCanvas())}>clear</button>

      </Paper>
      </Box>
    )
}

export default Canvas
