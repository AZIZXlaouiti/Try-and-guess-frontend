import React from 'react'
import { useSelector } from 'react-redux'
const UserList = () => {
    const session = useSelector(state=>state.sessions)
    
    const userLis = session.users.map((user)=>{
        return (
        <>
            <li>{user.username} {user.username === session.turn.username?"is Drawing Now !":""} {user.username === session.currentUser.user.username?"(YOU)":null}points:{user.score}</li>
        </>
        )
    })
    return (
        <div>
            <h1>online users</h1>
            {userLis}
        </div>
    )
}

export default UserList
