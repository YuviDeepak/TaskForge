import React, { useRef, useState, useEffect } from 'react'
import './Groups.css'
import GroupPop from '../GroupPop/GroupPop'
import '../GroupPop/GroupPop.css'

const Groups = () => {
  const [add, isAdd] = useState(false)
  const [join, isJoin] = useState(false)
  const [selectedGroup, setSelectedGroup] = useState(null)

  const [createdGroups, setCreatedGroups] = useState([])
  const [joinedGroups, setJoinedGroups] = useState([])

  const formRef1 = useRef()
  const formRef2 = useRef()

  const userObj = JSON.parse(localStorage.getItem("user"))

  const fetchGroups = async () => {
    try {
      const res = await fetch(
        `http://localhost:7000/group/user/${userObj._id}`
      )

      const data = await res.json()

      if (!res.ok) throw new Error(data.message)

      setCreatedGroups(data.response.createdGroups)
      setJoinedGroups(data.response.joinedGroups)

    } catch (err) {
      console.log(err.message)
    }
  }

  useEffect(() => {
    fetchGroups()
  }, [])

  const addNewGroupFun = async (e) => {
    e.preventDefault()

    const grpName = formRef1.current.groupName.value.trim()

    if (!grpName) {
      alert("Enter group name")
      return
    }

    const grpData = {
      groupName: grpName,
      createdBy: userObj._id,
      members: [userObj._id]
    }

    try {
      const res = await fetch("http://localhost:7000/group", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(grpData)
      })

      const data = await res.json()

      if (!res.ok) throw new Error(data.message)

      alert(data.message)
      formRef1.current.reset()
      fetchGroups() // refresh

    } catch (err) {
      alert(err.message)
    }
  }

  const joinNewGroupFun = async (e) => {
    e.preventDefault()

    const groupId = formRef2.current.groupId.value.trim()

    if (!groupId) {
      alert("Enter group ID")
      return
    }

    try {
      const res = await fetch(
        `http://localhost:7000/group/join/${groupId}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json"
          },
          body: JSON.stringify({
            userId: userObj._id
          })
        }
      )

      const data = await res.json()

      if (!res.ok) throw new Error(data.message)

      alert("Joined successfully")
      formRef2.current.reset()
      fetchGroups()

    } catch (err) {
      alert(err.message)
    }
  }

  return (
    <div className="groupContainer">

      <form className='groupSearchForm'>
        <input type="text" placeholder="Search groups..." />
        <button type="submit">
          <i className="fa-solid fa-magnifying-glass"></i>
        </button>
      </form>

      {
        userObj?.role === "admin" && (
          <div className="addGroup">
            <div className="addGroupLabel">
              <p>Create Groups</p>
              <button type="button" onClick={() => isAdd(!add)}>+</button>
            </div>

            {add && (
              <form ref={formRef1} onSubmit={addNewGroupFun}>
                <input type="text" name='groupName' placeholder="Enter group name" />
                <button type="submit">Add</button>
              </form>
            )}
          </div>
        )
      }

      {
        userObj?.role === "user" && (
          <div className="addGroup">
            <div className="addGroupLabel">
              <p>Join Groups</p>
              <button type="button" onClick={() => isJoin(!join)}>+</button>
            </div>

            {join && (
              <form ref={formRef2} onSubmit={joinNewGroupFun}>
                <input type="text" name='groupId' placeholder="Enter group ID" />
                <button type="submit">Join</button>
              </form>
            )}
          </div>
        )
      }

      <div className="groupsBox">
        <div className="title">
          <p>Manage Groups</p>
        </div>

        <div className="gp">

          {
            userObj?.role === "admin" && (
              <>

                {
                  createdGroups.length > 0 ? (
                    createdGroups.map((grp) => (
                      <div key={grp._id} className="grpCard">
                       

                        <div className="grpName">
                          <h3>{grp.groupName}</h3>
                        </div>
                        <div className="grpView">
                          <button onClick={() => setSelectedGroup(grp)}><i className="fa-solid fa-eye"></i></button>
                        </div>

                      </div>
                    ))
                  ) : (
                    <p>No groups created</p>
                  )
                }
              </>
            )
          }

          {
            userObj?.role === "user" && (
              <>

                {
                  joinedGroups.length > 0 ? (
                    joinedGroups.map((grp) => (
                      <div key={grp._id} className="grpCard">
                        <div className="grpName">
                          <h3>{grp.groupName}</h3>
                        </div>
                        <div className="grpView">
                          <button onClick={() => setSelectedGroup(grp)}><i className="fa-solid fa-eye"></i></button>
                        </div>
                      </div>
                    ))
                  ) : (
                    <p>No groups joined</p>
                  )
                }
              </>
            )
          }

        </div>
      </div>
      {
        (selectedGroup) && (
          <div className="ppoopp">
            <GroupPop selectedGroup={selectedGroup} setSelectedGroup={setSelectedGroup} />
          </div>
        )
      }
    </div>
  )
}

export default Groups