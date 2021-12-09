import React from 'react';
import { useSelector } from 'react-redux'
interface TimerProps {
  roundTime: RoundTime;
}
type RoundTime = {
    timeToComplete: number;
    startTime: number;
  };

const Timer: React.FC<TimerProps> = ({ roundTime }) => {
  const room= useSelector((state:any)=> state.connections.room)
  const counter = useSelector((state:any)=> state.channels.description.counter)
  

  const [currentCount, setCount] = React.useState(counter);
  const timer = () => setCount(currentCount - 1);
  
  React.useEffect(
    () => {
        if (currentCount <= 0) {
            return;
        }
        const id = setInterval(()=>{
          if (currentCount){

            timer()
            room.perform('timer',{
              counter: currentCount
            })
          }
        }, 1000);
        return () => clearInterval(id);
    },
    [currentCount]
);
  return <div id='timer'>{counter}</div>;
};
export default Timer;