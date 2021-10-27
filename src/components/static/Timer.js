import React  , {useEffect, useState} from 'react'
import {  start , stop } from '../../actions/timerLogs'
import { useSelector, useDispatch } from 'react-redux'
const Timer = () => {

    const dispatch = useDispatch()
    const count = useSelector(state => state.timer.count)
    const running = useSelector(state => state.timer.running)
    // const [stop , setStop ] = useState(false)
    useEffect(() => {
        const id = setInterval(() => {
            console.log('stop',stop)
            if (running) {
                dispatch(start())
                console.log("count",count)  
            }
           
        }, 1000)
       
        return function cleanup() {
            clearInterval(id)
        }
    }, [running ])



    return (
        <>
        <h1 id="count" >Count: {count}</h1>
        <button onClick={()=>dispatch(stop())}></button>
       </>
    )

}

export default Timer
