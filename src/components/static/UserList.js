import React from 'react'
import { useSelector } from 'react-redux'
const UserList = () => {
    const users = useSelector(state=>state.sessions.users)

    const userLis = users.map((user)=>{
        return (

            <li>{user.username}</li>
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
