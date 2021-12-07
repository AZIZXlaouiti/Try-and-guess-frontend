import React from 'react'
import { useSelector } from 'react-redux'
export const ScoreBoard: React.FC = ()=>{
  const players = useSelector((state:any)=> state.channels)
    return (
        <div id='scoreboard'>
           {players.map((e,i)=><h2 key={i}>{e.username}</h2>)}
        </div>
    )
}