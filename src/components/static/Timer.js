import React  , {useEffect} from 'react'
import { decrement } from '../../actions/timerLogs'
import { useSelector, useDispatch } from 'react-redux'
const Timer = () => {

    const dispatch = useDispatch()
    const count = useSelector(state => state.timer.count)
    const running = useSelector(state => state.timer.running)
    
    useEffect(() => {
        const id = setInterval(() => {
            if (running) {
                dispatch(decrement())
            }
        }, 1000)
        
        return function cleanup() {
            clearInterval(id)
        }
    }, [running])



    return (
        <h1 id="count">Count: {count}</h1>
    )
}

export default Timer
