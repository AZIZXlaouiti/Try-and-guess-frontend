import React from 'react';
import { useSelector } from 'react-redux'
interface TimerProps {
  roundTime: RoundTime;
  isStart: IsStart;
}
type RoundTime = {
    timeToComplete: number;
    startTime: number;
  };
type IsStart = {
    isStart: boolean
}
const Timer: React.FC<TimerProps> = ({ roundTime , isStart }) => {
  const room = useSelector((state:any)=> state.connections.room)
  const info = useSelector((state:any)=> state.channels.description)
  
  const [currentCount, setCount] = React.useState(
    info.counter
  );
  const timer = () => setCount(info.counter - Math.floor((Date.now() - new Date( info.updated_at).getTime())/1000));
  
  React.useEffect(
    () => {
        if (currentCount < 0) {
             room.perform('end_timer')
            return;
        }
        const id = setInterval(()=>{
            if (isStart){
                if (currentCount){
      
                  timer()
                 // console.log(info.counter - Math.floor((Date.now() - new Date( info.updated_at).getTime())/1000))

                  // room.perform('timer',{
                  //   counter: currentCount
                  // })
                }
            }
        }, 1000);
        return () => clearInterval(id);
    },
    [isStart && currentCount]
);
console.log(currentCount)
return <div id='timer'>{currentCount}</div>;
};
export default Timer;