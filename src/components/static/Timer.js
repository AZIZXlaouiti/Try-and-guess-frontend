import React  , {useEffect, useState} from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { IconButton  } from '@mui/material'
import AlarmIcon from '@mui/icons-material/Alarm';
const Timer = () => {
    const count = useSelector(state => state.timer.count)
    return (
        <div className="gameHeader">
        <IconButton>
        <AlarmIcon/>
        {count}
     </IconButton>
       </div>
    )
}
export default Timer
