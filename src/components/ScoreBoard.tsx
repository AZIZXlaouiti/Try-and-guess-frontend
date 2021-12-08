import React from 'react'
import { useSelector } from 'react-redux'
export const ScoreBoard: React.FC = ()=>{
  const players = useSelector((state:any)=> state.channels)
    return (
        <div id='scoreboard' >
           {players.map((e,i)=>{

             return (
               
                          <div className='player'>
                          <div className='avatar'><div className='img'></div></div>
                          <div className='info' key={i}>{e.username}</div>
                          </div>
             )
                          })
           }
       
        </div>
    )
}