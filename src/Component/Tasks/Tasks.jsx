
import React, { useEffect, useRef, useState } from 'react'
import './Tasks.css'
import { useNavigate } from 'react-router-dom'
import TaskPop from '../TaskPop/TaskPop'
import '../TaskPop/TaskPop.css'

const Tasks = ({ }) => {
    const navigate = useNavigate()
    const userObj = JSON.parse(localStorage.getItem("user"))

    const [selectedTask, setSelectedTask] = useState(null)

    const [addTask, isAddTask] = useState(false)
    const [createdTasks, setCreatedTasks] = useState([])
    const [assignedTasks, setAssignedTasks] = useState([])
    const [isopen, setIsOpen] = useState(false)

    const formRef = useRef()

    let fetchTask = async () => {
        try {
            const res = await fetch(`https://taskforge-backend-hgwj.onrender.com/tasks/user/${userObj._id}`)

            const data = await res.json()

            if (!res.ok) throw new Error(data.message)

            setCreatedTasks(data.response.createdTasks)
            setAssignedTasks(data.response.assignedTasks)

        } catch (err) {
            alert(err.message)
        }
    }

    useEffect(() => {
        fetchTask()
    }, [])

    console.log("Assigned Tasks => ", assignedTasks);


    let addTaskfun = async (e) => {
        e.preventDefault()

        let taskObj = {
            taskName: formRef.current.name.value.trim(),
            taskDescription: formRef.current.description.value.trim(),
            createdBy: userObj._id,
            groups: [],
            completedBy: [],

        }

        try {
            const res = await fetch("https://taskforge-backend-hgwj.onrender.com/tasks", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(taskObj)
            })

            const data = await res.json()

            if (!res.ok) throw new Error(data.message)

            alert(data.message)
            formRef.current.reset()
            fetchTask()

        } catch (err) {
            alert("exp " + err.message)
        }
    }



    return (
        <>
            <div className="tasks groupContainer">

                <form className='groupSearchForm'>
                    <input type="text" placeholder="Search tasks..." />
                    <button type="submit">
                        <i className="fa-solid fa-magnifying-glass"></i>
                    </button>
                </form>

         
                {
                    (userObj?.role === "admin") && (
                        <div className="addTasks addGroup">
                            <div className="addTaskLabel addGroupLabel">
                                <p>Create Tasks</p>
                                <button onClick={() => isAddTask(prev => !prev)}>+</button>
                            </div>

                            {
                                addTask && (
                                    <form className='deepp' ref={formRef} onSubmit={addTaskfun}>
                                        <input type="text" name='name' />
                                        <input type="text" name='description' />
                                        <button>Create</button>
                                    </form>
                                )
                            }
                        </div>
                    )
                }

                <div className="tasksCardsBox groupsBox">
                    <div className="gp">

                        
                        {
                            (userObj.role === "admin") && ((createdTasks.length > 0) ? (
                                createdTasks.map(ta => (
                                    <div key={ta._id} className="tCard grpCard">
                                        <div className="tkName grpName">
                                            {ta.taskName}
                                        </div>
                                        <div className="grpView">
                                            <button onClick={() => setSelectedTask(ta)}><i className="fa-solid fa-eye"></i></button>
                                        </div>
                                    </div>
                                ))
                            ) : (
                                <div className="grpCard">
                                    <div className="grpName">
                                        <h3>No Created Tasks</h3>
                                    </div>
                                </div>
                            ))
                        }

                        {
                            userObj.role === "user" && (
                                assignedTasks.length > 0 ? (
                                    assignedTasks
                                        .filter(t => !t.completedBy?.includes(userObj._id))
                                        .map(ta => (
                                            <div key={ta._id} className="tCard grpCard">
                                                <div className="tkName grpName">
                                                    {ta.taskName}
                                                </div>
                                                <div className="grpView">
                                                    <button onClick={() => setSelectedTask(ta)}>
                                                        <i className="fa-solid fa-eye"></i>
                                                    </button>
                                                </div>
                                            </div>
                                        ))
                                ) : (
                                    <h3>No Pending Tasks</h3>
                                )
                            )
                        }




                    </div>

                </div>

            </div>

            {
                (selectedTask) && (
                    <div className="ppoopp">
                        <TaskPop selectedTask={selectedTask} fetchTask={fetchTask} setSelectedTask={setSelectedTask} />
                    </div>
                )
            }

        </>
    )
}

export default Tasks