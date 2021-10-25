import React, { useEffect, useState, useRef } from "react";
const styles = {
  canvas: {
    border: "1px solid #333",
    margin: "20px 0px",
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
const DrawApp2 = ({state , setState , handleSendCanvas}) => {
    const data = [
        {
          x: 556,
          y: 549,
        },
        {
          x: 561,
          y: 548,
        },
        {
          x: 570,
          y: 548,
        },
        {
          x: 586,
          y: 548,
        }
    ]
  const [locations, setLocations] = useState([
    {
      x: 556,
      y: 549,
    },
    {
      x: 561,
      y: 548,
    },
    {
      x: 570,
      y: 548,
    },
    {
      x: 586,
      y: 548,
    },
    {
      x: 606,
      y: 548,
    },
    {
      x: 626,
      y: 548,
    },
    {
      x: 652,
      y: 548,
    },
    {
      x: 672,
      y: 548,
    },
    {
      x: 694,
      y: 547,
    },
    {
      x: 711,
      y: 546,
    },
    {
      x: 723,
      y: 545,
    },
    {
      x: 732,
      y: 545,
    },
    {
      x: 736,
      y: 545,
    },
    {
      x: 737,
      y: 545,
    },
  ]);
  const canvasRef = useRef(null);
  const container = [];
  
  useEffect(() => {
    reset();
  }, []);

  const handleMouseMove = (e) => {
    const canvasObj = canvasRef.current;
    const ctx = canvasObj.getContext("2d");
    if (state.pen === "down") {
      ctx.beginPath();
      ctx.lineWidth = state.lineWidth;
      ctx.lineCap = "round";
      if (state.mode === "draw") {
        // ctx.strokeStyle = state.penColor
      }
      const newLocation = { x: e.clientX, y: e.clientY };
      setLocations([...locations, newLocation]);
      ctx.moveTo(state.penCoords[0], state.penCoords[1]); //move to old position
      ctx.lineTo(e.nativeEvent.offsetX, e.nativeEvent.offsetY); //draw to new position
      ctx.stroke();
      setState({
        ...state,
        penCoords: [e.nativeEvent.offsetX, e.nativeEvent.offsetY],
      });
      handleSendCanvas(state)
    }
  };

  const handleMouseDown = (e) => {
    setState({
      ...state,
      pen: "down",
      penCoords: [e.nativeEvent.offsetX, e.nativeEvent.offsetY],
    });
  };
  const handleMouseUp = (e) => {
    setState({
      ...state,
      pen: "up",
    });
  };
  const reset = () => {
    setState({
      mode: "draw",
      pen: "up",
      lineWidth: 10,
      penColor: "black",
      penCoords: [],
    });
    setLocations([]);
    const canvasObj = canvasRef.current;
    const ctx = canvasObj.getContext("2d");
    // ctx variable  allows us to interact with properties in the HTML5 Canvas API
    // const ctx = this.refs.canvas.getContext('2d')
    ctx.fillStyle = "white";
    ctx.clearRect(0, 0, 800, 600);
    ctx.fillRect(0, 0, 800, 600);

    ctx.lineWidth = 10;
  };
  const load = () => {
    // const canvas = canvasRef.current
    // const ctx = canvas.getContext('2d')
    // data.forEach((k)=>{
    //     draw(ctx, k)
    //    })
   
  };
  console.log("location", locations);
  return (
    <div style={styles.maindiv}>
      <h3> React Canvas Component</h3>
      <h4>Pen by mohamed aziz laouiti</h4>
      <canvas
        ref={canvasRef}
        width="800px"
        height="600px"
        style={styles.canvas}
        onMouseDown={handleMouseDown}
        onMouseMove={handleMouseMove}
        onMouseUp={handleMouseUp}
      ></canvas>
      <button onClick={reset} style={(styles.btn, styles.button)}>
        Reset
      </button>
      <button onClick={load} style={(styles.btn, styles.button)}>
        load
      </button>
    </div>
  );
};

export default DrawApp2;
