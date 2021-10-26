import React, { useRef , useState } from 'react';
import { render } from 'react-dom';
import { Stage, Layer, Line, Text } from 'react-konva';
const styles = {
  canvas: {
    border: "1px solid #333",
    margin: "20px 0px",
    backgroundColor: 'white'
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
  },

  colorSwatches: {
    red: { backgroundColor: "red" },
    orange: { backgroundColor: "orange" },
    yellow: { backgroundColor: "yellow" },
    green: { backgroundColor: "green" },
    blue: { backgroundColor: "blue" },
    purple: { backgroundColor: "purple" },
    black: { backgroundColor: "black" },
  },
};
const Canvas = ({lines, setLines, handleSendCanvas}) => {
  const [tool, setTool] = useState('pen');
  
  const isDrawing = useRef(false);
  const lo = useRef([])
  const data = [
    {
        "tool": "pen",
        "points": [
            249,
            186.90625,
            250,
            188.90625,
            250,
            193.90625,
            251,
            201.90625,
            253,
            210.90625,
            253,
            220.90625,
            255,
            233.90625,
            258,
            245.90625,
            260,
            255.90625,
            264,
            265.90625,
            268,
            273.90625,
            271,
            279.90625,
            274,
            283.90625,
            278,
            285.90625,
            280,
            286.90625,
            284,
            287.90625,
            289,
            288.90625,
            295,
            288.90625,
            304,
            284.90625,
            314,
            280.90625,
            326,
            274.90625,
            339,
            265.90625,
            349,
            259.90625,
            358,
            255.90625,
            364,
            251.90625,
            368,
            249.90625,
            371,
            248.90625,
            373,
            247.90625,
            374,
            247.90625,
            376,
            247.90625
        ]
    },
    {
        "tool": "pen",
        "points": [
            277,
            259.90625,
            279,
            270.90625,
            282,
            282.90625,
            285,
            294.90625,
            288,
            306.90625,
            291,
            320.90625,
            293,
            331.90625,
            295,
            345.90625,
            298,
            354.90625,
            301,
            360.90625,
            304,
            364.90625,
            307,
            367.90625,
            312,
            368.90625,
            319,
            369.90625,
            327,
            369.90625,
            338,
            365.90625,
            350,
            360.90625,
            364,
            355.90625,
            379,
            348.90625,
            392,
            341.90625,
            402,
            335.90625,
            411,
            330.90625,
            418,
            327.90625,
            422,
            326.90625,
            425,
            325.90625,
            426,
            325.90625,
            427,
            325.90625,
            428,
            328.90625,
            430,
            333.90625,
            432,
            341.90625,
            435,
            349.90625,
            438,
            358.90625,
            441,
            367.90625,
            445,
            375.90625,
            449,
            382.90625,
            454,
            386.90625,
            460,
            391.90625,
            469,
            394.90625,
            484,
            395.90625,
            501,
            395.90625,
            518,
            392.90625,
            543,
            385.90625,
            570,
            377.90625,
            597,
            367.90625,
            624,
            358.90625,
            647,
            350.90625
        ]
    },
    {
        "tool": "pen",
        "points": [
            416,
            484.90625,
            415,
            484.90625,
            412,
            487.90625,
            405,
            496.90625,
            395,
            510.90625,
            381,
            530.90625,
            366,
            551.90625,
            353,
            570.90625,
            343,
            586.90625,
            338,
            596.90625,
            338,
            601.90625,
            338,
            602.90625,
            340,
            602.90625,
            349,
            602.90625,
            365,
            595.90625,
            396,
            581.90625,
            429,
            564.90625,
            480,
            540.90625,
            527,
            517.90625,
            558,
            503.90625,
            587,
            491.90625,
            597,
            488.90625,
            598,
            488.90625,
            598,
            489.90625,
            594,
            496.90625,
            588,
            513.90625,
            580,
            533.90625,
            577,
            548.90625,
            574,
            562.90625,
            573,
            574.90625,
            573,
            586.90625,
            574,
            594.90625,
            578,
            598.90625,
            583,
            601.90625,
            592,
            602.90625,
            607,
            600.90625,
            633,
            593.90625,
            669,
            580.90625,
            707,
            569.90625,
            756,
            557.90625,
            800,
            550.90625,
            826,
            548.90625,
            848,
            548.90625,
            855,
            550.90625,
            857,
            551.90625,
            857,
            553.90625,
            857,
            557.90625,
            853,
            564.90625,
            851,
            570.90625,
            848,
            576.90625,
            846,
            581.90625,
            845,
            586.90625,
            845,
            591.90625,
            845,
            596.90625,
            845,
            598.90625
        ]
    }
]
  const handleMouseDown = (e) => {
    isDrawing.current = true;
    let pos = e.target.getStage().getPointerPosition();
    setLines([...lines, { tool, points: [pos.x, pos.y] }]);
    console.log('down')
    // lo.current = lines
  };
  
  const handleMouseMove = (e) => {
    // no drawing - skipping
    if (!isDrawing.current) {
      return;
    }
    let stage = e.target.getStage();
    let point = stage.getPointerPosition();
    let lastLine = lines[lines.length - 1];
    // add point
    lastLine.points = lastLine.points.concat([point.x, point.y]);

    // replace last
    lines.splice(lines.length - 1, 1, lastLine);
    setLines(lines.concat());
    // lo.current = lines
    handleSendCanvas(lines)
  };

  const handleMouseUp = () => {
    isDrawing.current = false;
  };
  console.log(lines,'lines')
  return (
    <div>
        <div id="word-container">
        <span className="guess-letter ">_</span>
        <span className="guess-letter ">_</span>
        <span className="guess-letter ">h</span>
        <span className="guess-letter ">n</span>
        <span className="guess-letter ">i</span>
        <span className="guess-letter ">_</span>
      </div>
      <Stage
        width={700} height={700}
        onMouseDown={handleMouseDown}
        onMousemove={handleMouseMove}
        onMouseup={handleMouseUp}
      
      >
        <Layer>
          <Text text="Just start drawing" x={5} y={30} />
          {lines.map((line, i) => (
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
      <button onClick={(e)=>setLines(data)}>load</button>
      <button onClick={(e)=>setLines([])}>clear</button>

      
    </div>
  );
};
export default  Canvas

