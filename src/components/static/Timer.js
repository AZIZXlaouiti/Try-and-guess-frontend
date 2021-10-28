import React  , {useEffect, useState} from 'react'
import {  start , stop } from '../../actions/timerLogs'
import { useSelector, useDispatch } from 'react-redux'
import { IconButton  } from '@mui/material'
import AlarmIcon from '@mui/icons-material/Alarm';
const Timer = () => {

    const dispatch = useDispatch()
    const count = useSelector(state => state.timer.count)
    const running = useSelector(state => state.timer.running)
    useEffect(() => {
        const id = setInterval(() => {
            if (running) {
                dispatch(start())
            }if (count <= 1 ){
                dispatch(stop())
            }
           
        }, 1000)
        return function cleanup() {
            
            clearInterval(id)
        }
    }, [running , count ])



    return (
        <>
        <IconButton onClick={()=>dispatch(stop())}>
        <AlarmIcon/>
        {count}
     </IconButton>
       </>
    )

}

export default Timer
