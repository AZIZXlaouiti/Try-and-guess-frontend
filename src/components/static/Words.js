import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'

const Words = () => {
    const selectedWord = useSelector(state=>state.words)
    const session = useSelector(state=>state.sessions)
    if (session.turn.username === session.currentUser.user.username){

        return (
            <div id="currentWord">{selectedWord}</div>
        )
    }
    return  <div id="currentWord">_______</div>
   
}

export default Words
