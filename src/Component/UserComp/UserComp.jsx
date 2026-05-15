import React, { useEffect, useState } from 'react'

const UserComp = () => {
    const [user, setUser] = useState([])
    let userObj = JSON.parse(localStorage.getItem("user"))
    let fetchUsers = async () => {
        try {
            const res = await fetch(`https://taskforge-backend-hgwj.onrender.com/group/allusers/${userObj._id}`)
            const data = await res.json()
            if (!res.ok) {
                alert("user not fetched")
                return
            }
            setUser(data.response)
        }
        catch (err) {
            alert(err.message)
        }
    }

    useEffect(() => {
        fetchUsers()
    }, [])

    console.log(user);
    return (
        <>
            <div className="groupContainer">
                <div className="groupsBox">
                    <div className="gp">
                        {
                            (user.length > 0) ? (
                                user.map(u => (
                                    <div className="grpCard" key={u._id}>
                                        <div className="grpName">
                                            <h3>{u.name}</h3>
                                        </div>
                                    </div>
                                ))
                            ) : (
                                <div className="grpCard">
                                    <div className="grpName">
                                        <h3>No Data</h3>
                                    </div>
                                </div>
                            )
                        }
                    </div>
                </div>
            </div>
        </>
    )
}

export default UserComp