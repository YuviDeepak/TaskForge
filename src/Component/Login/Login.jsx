import React, { useRef } from 'react'
import { Link, useNavigate } from 'react-router-dom'

const Login = ({ setUserObj }) => {

    const navigate = useNavigate()
    const formRef = useRef()

    const handleSubmit = async (e) => {
        e.preventDefault()

        const email = formRef.current.email.value
        const password = formRef.current.password.value
        const role = formRef.current.role.value

        if (!role) {
            alert("Please select role")
            return
        }

        try {
            const res = await fetch("http://localhost:7000/login", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({ email, password, role })
            })

            const data = await res.json()

            if (!res.ok) {
                alert(data.message)
                return
            }

            setUserObj(data.response)

            localStorage.setItem("user", JSON.stringify(data.response))

            navigate("/panel")

        } catch (err) {
            console.log(err)
            alert("Server not reachable")
        }
    }

    return (
        <div className="registrationBox">
            <form ref={formRef} onSubmit={handleSubmit}>

                <div className="tag title">
                    <h2>Login</h2>
                </div>

                {/* ROLE */}
                <div className="tag">
                    <label>Role :</label>
                    <select name="role" required>
                        <option value="">Select Role</option>
                        <option value="admin">Admin</option>
                        <option value="user">User</option>
                    </select>
                </div>

                {/* EMAIL */}
                <div className="tag">
                    <label>Email :</label>
                    <input required type="email" name='email' />
                </div>

                {/* PASSWORD */}
                <div className="tag">
                    <label>Password :</label>
                    <input required type="password" name='password' />
                </div>

                {/* BUTTON */}
                <div className="tag btn">
                    <button type="submit">Login</button>
                </div>

                {/* LINKS */}
                <div className="tag btn">
                    <Link className='link' to='/register'>Create Account</Link>
                </div>

            </form>
        </div>
    )
}

export default Login