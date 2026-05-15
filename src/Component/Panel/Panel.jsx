import React, { useState, useEffect } from 'react'
import './Panel.css'
import { useNavigate, Outlet, useLocation } from 'react-router-dom'

const Panel = ({ userObj, setUserObj }) => {

    const [isOpen, setIsOpen] = useState(true)

    const navigate = useNavigate()
    const location = useLocation()

    useEffect(() => {
        if (!userObj) {
            navigate("/")
        }
    }, [userObj])

    const menu = [
        {
            title: "Dashboard",
            path: "/panel",
            icon: "fa-solid fa-tachograph-digital"
        },

        ...(userObj?.role === "admin"
            ? [
                {
                    title: "Groups",
                    path: "/panel/groups",
                    icon: "fa-solid fa-group-arrows-rotate"
                },
                {
                    title: "Users",
                    path: "/panel/users",
                    icon: "fa-solid fa-people-group"
                }
            ]
            : [
                {
                    title: "Group",
                    path: "/panel/groups",
                    icon: "fa-solid fa-group-arrows-rotate"
                }
            ]
        ),

        {
            title: "Tasks",
            path: "/panel/tasks",
            icon: "fa-solid fa-list-check"
        },
        {
            title: "Leaderboard",
            path: "/panel/leaderboard",
            icon: "fa-solid fa-ranking-star"
        }
    ]

    const handleLogout = () => {
        setUserObj(null)
        localStorage.removeItem("user")
        navigate("/")
    }

    // Dynamic section title
    const currentTitle = menu.find(item => {

        // exact match for dashboard only
        if (item.path === "/panel") {
            return location.pathname === "/panel"
        }

        // partial match for nested routes
        return location.pathname.startsWith(item.path)

    })?.title || "Dashboard"

    return (
        <div className="containerPanel">

            {/* Sidebar */}
             <input type="checkbox" name="tg" id="tg" />
            <aside className={isOpen ? "" : "close"}>

                {/* Header */}
                <header className='cmp header'>

                    <div className="accbox">
                        <span className='logopanel'>
                            <i className="fa-solid fa-user"></i>
                        </span>

                        {isOpen && (
                            <p className='rolename'>
                                {userObj?.name} ({userObj?.role})
                            </p>
                        )}
                    </div>

                    <button
                        className='toggle'
                        onClick={() => setIsOpen(!isOpen)}
                    >
                        <i className="fa-solid fa-arrow-right-arrow-left"></i>
                    </button>

                </header>

                {/* Menu */}
                <main className='cmp'>

                    <div className="mainBox">

                        {isOpen && <h3>Menu</h3>}

                        <ul>

                            {menu.map((item) => {

                                const isActive =
                                    item.path === "/panel"
                                        ? location.pathname === "/panel"
                                        : location.pathname.startsWith(item.path)

                                return (
                                    <li
                                        key={item.title}
                                        className={isActive ? "active" : ""}
                                        onClick={() => navigate(item.path)}
                                    >
                                        <i className={item.icon}></i>

                                        {isOpen && (
                                            <span>{item.title}</span>
                                        )}
                                    </li>
                                )
                            })}

                        </ul>

                    </div>

                </main>

                {/* Footer */}
                {isOpen && (
                    <footer className='cmp'>

                        {/* <p>Manage your group easily</p> */}

                        <button
                            onClick={handleLogout}
                            className="logoutBtn"
                        >
                            Logout
                        </button>

                    </footer>
                )}

            </aside>
                
            {/* Main Section */}
            <section>

                <header className="panelHeader">
                    <h2>{currentTitle}</h2>
                    <label htmlFor="tg" className='tgclass'><i className="fa-solid fa-bars"></i></label>
                   
                </header>

                <main className="panelMain">
                    <Outlet />
                </main>

                <footer className="panelFooter">
                    <p>© Taskforge</p>
                </footer>

            </section>

        </div>
    )
}

export default Panel