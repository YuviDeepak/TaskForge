import React, { useState, useEffect } from 'react'
import './Panel.css'
import { useNavigate, Outlet, useLocation } from 'react-router-dom'

const Panel = ({ userObj, setUserObj }) => {

    const [isOpen, setIsOpen] = useState(true)

    const navigate = useNavigate()
    const location = useLocation()

    // ✅ PROTECT PANEL (no login → redirect)
    useEffect(() => {
        if (!userObj) {
            navigate("/")
        }
    }, [userObj])

    // ✅ ROLE BASED MENU
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

    // ✅ LOGOUT
    const handleLogout = () => {
        setUserObj(null)
        localStorage.removeItem("user")   // important
        navigate("/")
    }

    // ✅ CURRENT TITLE
    const currentTitle =
        menu.find(item => location.pathname.startsWith(item.path))?.title
        || "Dashboard"

    return (
        <div className="containerPanel">

            {/* SIDEBAR */}
            <aside className={isOpen ? "" : "close"}>

                {/* HEADER */}
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

                {/* MENU */}
                <main className='cmp'>
                    <div className="mainBox">

                        {isOpen && <h3>Menu</h3>}

                        <ul>
                            {menu.map((item) => (
                                <li
                                    key={item.title}
                                    className={
                                        location.pathname.startsWith(item.path)
                                            ? "active"
                                            : ""
                                    }
                                    onClick={() => navigate(item.path)}
                                >
                                    <i className={item.icon}></i>
                                    {isOpen && <span>{item.title}</span>}
                                </li>
                            ))}
                        </ul>

                    </div>
                </main>

                {/* FOOTER */}
                {isOpen && (
                    <footer className='cmp'>
                        <p>Manage your group easily</p>
                        <button
                            onClick={handleLogout}
                            className="logoutBtn"
                        >
                            Logout
                        </button>
                    </footer>
                )}

            </aside>

            {/* MAIN CONTENT */}
            <section>

                <header className="panelHeader">
                    <h2>{currentTitle}</h2>
                </header>

                <main className="panelMain">
                    {/* ROUTES RENDER HERE */}
                    <Outlet />
                </main>

                <footer className="panelFooter">
                    <p>© 2026 Your App</p>
                </footer>

            </section>

        </div>
    )
}

export default Panel