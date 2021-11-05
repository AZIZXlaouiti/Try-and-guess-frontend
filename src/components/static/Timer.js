import React  , {useEffect, useState} from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { IconButton  } from '@mui/material'
import AlarmIcon from '@mui/icons-material/Alarm';
const Timer = () => {
    const count = useSelector(state => state.timer.count)
    return (
       
        <IconButton>
        <AlarmIcon/>
        {count}
     </IconButton>
    )
}
export default Timer
