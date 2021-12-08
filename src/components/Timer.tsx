import React from 'react';

interface TimerProps {
  roundTime: RoundTime;
}
type RoundTime = {
    timeToComplete: number;
    startTime: number;
  };

const Timer: React.FC<TimerProps> = ({ roundTime }) => {
  const [time, setTime] = React.useState(
    (roundTime.timeToComplete + roundTime.startTime - Date.now())+20*1000
  );
  React.useEffect(() => {
    let isStart = true;
    setTimeout(() => {
      if (isStart) {
        const newTime =
        (roundTime.timeToComplete + roundTime.startTime - Date.now())+20*1000
        if (Math.round(newTime / 1000) < 0) {
          return;
        }
        setTime(newTime);
      }
    }, 250);
    return () => {
      isStart = false;
    };
  }, [time]);
  return <div id='timer'>{Math.round(time / 1000)}</div>;
};
export default Timer;