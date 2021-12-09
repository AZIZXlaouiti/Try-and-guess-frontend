import React from 'react'
import { useSelector } from 'react-redux'
export const ScoreBoard: React.FC = ()=>{
  const players = useSelector((state:any)=> state.channels.activeUsers)
  const currentUser = useSelector((state:any)=> state.sessions.user)
  const round  =  useSelector((state:any)=> state.channels.description.round)
  return (
   <>
  {players?  <div id='scoreboard' >
  {players.map((e,i)=>{

    return (
      
                 <div className='player'key={i}>
                 <div className='avatar'><div className='img'>{i === round-1? <span id="pencil"></span> : null}</div></div>
                 <div className='info' ><div>{e.username}</div>{currentUser.username === e.username ? <div id='name'>(You)</div>:null}</div>
                 <div>points:{e.score}</div>
                 </div>
    )
                 })
  }

</div>:null}
   </>
  )
    
}