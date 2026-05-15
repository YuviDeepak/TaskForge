import React, { useEffect, useState } from "react";
import Chart from "react-apexcharts";
import "./Dashboard.css";

const Dashboard = () => {

    const userObj = JSON.parse(localStorage.getItem("user"));

    const [excatUser, setExcatUser] = useState(null);

    const [createdGroupCount, setcreatedGroupCount] = useState(0);
    const [createdcreatedTasksCount, setcreatedcreatedTasksCount] = useState(0);

    const [joinedGroupCount, setjoinedGroupCount] = useState(0);
    const [assignedTasksCount, setassignedTasksCount] = useState(0);

    const [usersCount, setUsersCount] = useState(0);

    const [mostCompletedTask, setMostCompletedTask] = useState({});
    const [leastCompletedTask, setLeastCompletedTask] = useState({});

    const [sortedTasks, setSortedTasks] = useState([]);

    // FETCH GROUPS

    const fetchGroups = async () => {

        try {

            const res = await fetch(
                `https://taskforge-backend-hgwj.onrender.com/group/user/${userObj._id}`
            );

            const data = await res.json();

            if (!res.ok) {
                throw new Error(data.message);
            }

            setcreatedGroupCount(
                data.response.createdGroups?.length || 0
            );

            setjoinedGroupCount(
                data.response.joinedGroups?.length || 0
            );

        } catch (err) {

            console.log(err.message);

        }
    };

    // FETCH TASKS

    const fetchTasks = async () => {

        try {

            const res = await fetch(
                `https://taskforge-backend-hgwj.onrender.com/tasks/user/${userObj._id}`
            );

            const data = await res.json();

            if (!res.ok) {
                throw new Error(data.message);
            }

            setcreatedcreatedTasksCount(
                data.response.createdTasks?.length || 0
            );

            setassignedTasksCount(
                data.response.assignedTasks?.length || 0
            );

        } catch (err) {

            console.log(err.message);

        }
    };

    // FETCH USERS

    const fetchUsers = async () => {

        try {

            const res = await fetch(
                `https://taskforge-backend-hgwj.onrender.com/group/allusers/${userObj._id}`
            );

            const data = await res.json();

            if (!res.ok) {
                throw new Error(data.message);
            }

            setUsersCount(data.response.length);

        } catch (err) {

            console.log(err.message);

        }
    };

    // FETCH MOST & LEAST TASKS

    const fetchMostLeast = async () => {

        try {

            const res = await fetch(
                `https://taskforge-backend-hgwj.onrender.com/tasks/task/${userObj._id}`
            );

            const data = await res.json();

            if (!res.ok) {
                throw new Error(data.message);
            }

            setMostCompletedTask(data.mostCompletedTask);
            setLeastCompletedTask(data.leastCompletedTask);
            setSortedTasks(data.sortedTasks);

        } catch (err) {

            console.log(err.message);

        }
    };

    // FETCH EXACT USER

    const fetchExcatUser = async () => {

        try {

            let res = await fetch(
                `https://taskforge-backend-hgwj.onrender.com/users/${userObj._id}`
            );

            let data = await res.json();

            if (!res.ok) {
                alert(data.message);
                return;
            }

            setExcatUser(data.response);

        } catch (err) {

            alert(err.message);

        }
    };

    useEffect(() => {

        fetchGroups();
        fetchTasks();
        fetchUsers();
        fetchMostLeast();
        fetchExcatUser();

    }, []);

    // ADMIN CHART

    const barSeries = [
        {
            name: "Completed Users",
            data: sortedTasks.map(
                task => task.completedBy?.length || 0
            )
        }
    ];

    const barOptions = {

        chart: {
            type: "bar",
            toolbar: {
                show: false
            }
        },

        plotOptions: {
            bar: {
                borderRadius: 8,
                horizontal: false,
                columnWidth: "45%"
            }
        },

        dataLabels: {
            enabled: false
        },

        xaxis: {
            categories: sortedTasks.map(
                task => task.taskName
            )
        },

        colors: [
            "oklch(57.906% 0.27439 300.028)"
        ],

        grid: {
            borderColor: "#2b2b40"
        }
    };

    // USER CHART

    const userChartSeries = [
        {
            name: "Tasks",
            data: [
                assignedTasksCount,
                excatUser?.completedTask || 0
            ]
        }
    ];

    const userChartOptions = {

        chart: {
            type: "bar",
            toolbar: {
                show: false
            }
        },

        plotOptions: {
            bar: {
                borderRadius: 8,
                columnWidth: "45%"
            }
        },

        dataLabels: {
            enabled: true
        },

        xaxis: {
            categories: [
                "Assigned Tasks",
                "Completed Tasks"
            ]
        },

        colors: [
            "oklch(57.906% 0.27439 300.028)"
        ],

        grid: {
            borderColor: "#2b2b40"
        }
    };

    return (

        <div className="dashboard">

            {/* TOP */}

            <div className="topSection">

                <div>

                    <h1>
                        Dashboard
                    </h1>

                    <p>
                        Welcome back {userObj?.name} 👋
                    </p>

                </div>

            </div>

            {
                userObj?.role === "admin" ? (

                    <>
                        {/* ADMIN DASHBOARD */}

                        <div className="cards">

                            {/* CREATED GROUPS */}

                            <div className="card">

                                <div className="cardTop">

                                    <span>
                                        Created Groups
                                    </span>

                                    <i className="fa-solid fa-layer-group"></i>

                                </div>

                                <h2>
                                    {createdGroupCount}
                                </h2>

                            </div>

                            {/* CREATED TASKS */}

                            <div className="card">

                                <div className="cardTop">

                                    <span>
                                        Created Tasks
                                    </span>

                                    <i className="fa-solid fa-list-check"></i>

                                </div>

                                <h2>
                                    {createdcreatedTasksCount}
                                </h2>

                            </div>

                            {/* TOTAL USERS */}

                            <div className="card">

                                <div className="cardTop">

                                    <span>
                                        Total Users
                                    </span>

                                    <i className="fa-solid fa-users"></i>

                                </div>

                                <h2>
                                    {usersCount}
                                </h2>

                            </div>

                        </div>

                        {/* TASK HIGHLIGHTS */}

                        <div className="taskHighlightSection">

                            {/* MOST COMPLETED */}

                            <div className="highlightCard mostCard">

                                <p className="highlightTitle">
                                    Most Completed Task
                                </p>

                                <h2>
                                    {
                                        mostCompletedTask?.taskName ||
                                        "No Task"
                                    }
                                </h2>

                                <span>
                                    Completed By
                                </span>

                                <h3>
                                    {
                                        mostCompletedTask?.completedBy?.length || 0
                                    } Users
                                </h3>

                            </div>

                            {/* LEAST COMPLETED */}

                            <div className="highlightCard leastCard">

                                <p className="highlightTitle">
                                    Least Completed Task
                                </p>

                                <h2>
                                    {
                                        leastCompletedTask?.taskName ||
                                        "No Task"
                                    }
                                </h2>

                                <span>
                                    Completed By
                                </span>

                                <h3>
                                    {
                                        leastCompletedTask?.completedBy?.length || 0
                                    } Users
                                </h3>

                            </div>

                        </div>
                    </>

                ) : (

                    <>
                        {/* USER DASHBOARD */}

                        <div className="cards">

                            {/* JOINED GROUPS */}

                            <div className="card">

                                <div className="cardTop">

                                    <span>
                                        Joined Groups
                                    </span>

                                    <i className="fa-solid fa-people-group"></i>

                                </div>

                                <h2>
                                    {joinedGroupCount}
                                </h2>

                            </div>

                            {/* ASSIGNED TASKS */}

                            <div className="card">

                                <div className="cardTop">

                                    <span>
                                        Assigned Tasks
                                    </span>

                                    <i className="fa-solid fa-clipboard-list"></i>

                                </div>

                                <h2>
                                    {assignedTasksCount}
                                </h2>

                            </div>

                            {/* COMPLETED TASKS */}

                            <div className="card">

                                <div className="cardTop">

                                    <span>
                                        Completed Tasks
                                    </span>

                                    <i className="fa-solid fa-circle-check"></i>

                                </div>

                                <h2>
                                    {excatUser?.completedTask || 0}
                                </h2>

                            </div>

                        </div>
                    </>

                )
            }

            {/* COMMON CHART */}

            <div className="chartCard">

                <div className="chartHeader">

                    <h2>

                        {
                            userObj?.role === "admin"
                                ? "Task Completion Analytics"
                                : "Your Task Analytics"
                        }

                    </h2>

                </div>

                <Chart
                    options={
                        userObj?.role === "admin"
                            ? barOptions
                            : userChartOptions
                    }

                    series={
                        userObj?.role === "admin"
                            ? barSeries
                            : userChartSeries
                    }

                    type="bar"
                    height={400}
                />

            </div>

        </div>
    );
};

export default Dashboard;