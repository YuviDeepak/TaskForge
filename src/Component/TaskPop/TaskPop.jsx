import React, { useEffect, useState } from 'react'


const TaskPop = ({ selectedTask,fetchTask, setSelectedTask }) => {
  console.log(selectedTask);
  let userObj = JSON.parse(localStorage.getItem("user"))
  const [isAdmin, setIsAdmin] = useState((userObj.role == "admin") ? true : false)

  const [createdGroup, setCreatedGroup] = useState([])
  const [assignedGroup, setAssignedGroup] = useState([])

  let fetchGroups = async () => {
    try {
      const res = await fetch(`https://taskforge-backend-hgwj.onrender.com/group/user/${userObj._id}`)
      const data = await res.json()
      if (!res.ok) {
        alert("Fetching unsuccessfull")
        return
      }
      setCreatedGroup(data.response.createdGroups)
    }
    catch (err) {
      alert(err.message)
    }
  }

useEffect(() => {
  if (isAdmin) {
    fetchGroups()
  }
}, [isAdmin,selectedTask])

  let handleChange = (e) => {
    let { checked, value } = e.target
    if (checked) {
      setAssignedGroup([...assignedGroup, value])
    }
    else if (!checked) {
      setAssignedGroup(assignedGroup.filter(item => (item != value)))
    }
  }

  let handleSubmit = async (e) => {
    e.preventDefault()

    try {
      let newTaskObj = {
        taskName: selectedTask.taskName,
        taskDescription: selectedTask.taskDescription,
        createdBy: selectedTask.createdBy,
        groups: [...selectedTask.groups, ...assignedGroup],
        completedBy: selectedTask.completedBy
      }
      let res = await fetch(`https://taskforge-backend-hgwj.onrender.com/tasks/${selectedTask._id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(newTaskObj)
      })
      const data = await res.json()
      if (!res.ok) throw new Error(data.message)
      alert(data.message)
      // setTimeout(() => {
      setSelectedTask(null)
      // }, 3000);
    }
    catch (err) {
      alert(err.message)
    }



  }

  let newG = createdGroup.filter(
    grp => !selectedTask.groups.includes(grp._id)
  )
  console.log("newG", newG);


  console.log(assignedGroup);

  let HandleTaskCompleted = async (e) => {
    e.preventDefault()
    try {
        let res = await fetch(
            `https://taskforge-backend-hgwj.onrender.com/tasks/usercompletion/${selectedTask._id}`,
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

        let data = await res.json()

        if (!res.ok) {
            alert(data.message)
            return
        }

        alert(data.message)

        fetchTask()

        setSelectedTask(null)

    } catch (err) {
        alert(err.message)
    }
}



  return (
    <>
      <div className="pop">

        <div className="taskName">
          <h1>{selectedTask.taskName}</h1>
          <button onClick={() => setSelectedTask(null)}>close</button>
        </div>
      </div>
      {
        (userObj.role == "admin") && (
          (newG.length > 0) ? (
            <form action="" onSubmit={(e) => handleSubmit(e)} className='grbform'>
              <div className="grbContainer">
                {
                  newG.map(grp => (

                    <div className="gbrCard">
                      <label htmlFor={grp._id}>{grp.groupName}</label>
                      <input
                        type="checkbox"
                        value={grp._id}
                        id={grp._id}
                        onChange={handleChange}
                      />
                    </div>
                  ))
                }
              </div>
              <div className="submitBtn">
                <button>ok</button>
              </div>
            </form>
          ) : (
            <div className="err">
              <h2>no data</h2>
            </div>
          ))
      }

      {
        (userObj.role == "user") && (

          <form action="" className='user'>
            <div className="confirmation">
              <input type="text" placeholder='' />
            </div>
            <div className="submitBtn">
              <button type='button' onClick={(e) => HandleTaskCompleted(e)}>Submit</button>
            </div>
          </form>

        )
      }

    </>
  )
}

export default TaskPop