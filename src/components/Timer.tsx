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
const [time, setTime] = React.useState(
    info.counter
  );
  React.useEffect(() => {
    setInterval(() => {
      if (isStart) {
        const newTime =
        info.counter - Math.floor((Date.now() - new Date( info.updated_at).getTime())/1000)
        if (newTime  <= 0) {
          return;
        }
        console.log(newTime)
        setTime(newTime);
      }
    }, 250);
    return () => {
        room.perform('end_timer')
    };
  }, [time && isStart ]);
return <div id='timer'>{time}</div>;
};
export default Timer;