import React from 'react'
import { useSelector } from 'react-redux'
export const ScoreBoard: React.FC = ()=>{
  const players = useSelector((state:any)=> state.channels)
  const currentUser = useSelector((state:any)=> state.sessions.user)
    return (
        <div id='scoreboard' >
           {players.map((e,i)=>{

             return (
               
                          <div className='player'key={i}>
                          <div className='avatar'><div className='img'><span id="pencil"></span></div></div>
                          <div className='info' ><div>{e.username}</div>{currentUser.username === e.username ? <div id='name'>(You)</div>:null}</div>
                          <div>points:{e.score}</div>
                          </div>
             )
                          })
           }
       
        </div>
    )
}