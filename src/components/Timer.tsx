import React from 'react';
import { useSelector } from 'react-redux'
import { useDispatch } from 'react-redux';
import { Dispatch } from 'react';
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
  const dispatch:Dispatch<any> = useDispatch()
  const [currentCount, setCount] = React.useState(
    info.counter
  );
  const timer = () => setCount(info.counter - Math.floor((Date.now() - new Date( info.updated_at).getTime())/1000));
  
  React.useEffect(
    () => {
        if (currentCount <= 0) {
             dispatch({type:"SET_CHOSEN_WORD",payload:info.chosen_word});
             room.perform('end_timer')
             setCount(info.counter)
            return; 
        }
        const id = setInterval(()=>{
            if (isStart){
                if (currentCount){
                  timer()
                }
            }
        }, 1000);
        return () => clearInterval(id);
    },
    [isStart && currentCount]
);
// console.log(currentCount)
return <div id='timer'>{currentCount}</div>;

};
export default Timer;