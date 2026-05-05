import React, { useEffect, useState } from 'react'



const GroupPop = ({ selectedGroup, setSelectedGroup }) => {

  const [popMembers, setPopMembers] = useState([])
  const [popTasks, setPopTasks] = useState([])

  const fetchAll = async () => {
    try {
      const res = await fetch(
        `http://localhost:7000/group/eachGroup/${selectedGroup._id}`
      )

      const data = await res.json()

      if (!res.ok) {
        alert("Failed to fetch group data")
        setSelectedGroup(null)
        return
      }

      setPopMembers(data?.response?.group?.members || [])
      setPopTasks(data?.response?.tasks || [])

    } catch (err) {
      alert(err.message)
    }
  }

  useEffect(() => {
    if (selectedGroup) fetchAll()
  }, [selectedGroup])

  return (
    <div className="grppopContainer">

      <header className="grpHeader">
        <h2>{selectedGroup.groupName}</h2>
        <button onClick={() => setSelectedGroup(null)}>✖</button>
      </header>

      <main>

        <section>
          <h3>Members</h3>
          <div className="totalMembers">
            {
              popMembers.length > 0 ? (
                popMembers.map(m => (
                  <div key={m._id} className="eachmem">
                    <p>{m.name}</p>
                  </div>
                ))
              ) : (
                <p>No members</p>
              )
            }
          </div>
        </section>

  
        <section>
          <h3>Tasks</h3>
          <div className="totalTasks">
            {
              popTasks.length > 0 ? (
                popTasks.map(t => (
                  <div key={t._id} className="eachTask">
                    <p>{t.taskName}</p>
                  </div>
                ))
              ) : (
                <p>No tasks</p>
              )
            }
          </div>
        </section>

      </main>

    </div>
  )
}

export default GroupPop