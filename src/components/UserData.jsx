import React from 'react'

function UserData({user}) {
    return (
        <div>
            <img src={user.photoURL} alt={user.displayName}/>
            <span>{user.displayName}</span>
        </div>
    )
}

export default UserData
