import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'

const Words = () => {
    const selectedWord = useSelector(state=>state.words)

    return (
        <div id="currentWord">{selectedWord}</div>
    )
}

export default Words
