import React, { useRef, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'

const Registration = () => {

    const navigate = useNavigate()
    const formRef = useRef()

    const [errorMsg, setErrorMsg] = useState("")
    const [loading, setLoading] = useState(false)

    const handleSubmit = async (e) => {
        e.preventDefault()
        setErrorMsg("")
        setLoading(true)

        const name = formRef.current.uname.value.trim()
        const email = formRef.current.email.value.trim().toLowerCase()
        const mobile = formRef.current.mobile.value.trim()
        const role = formRef.current.role.value
        const password = formRef.current.password.value
        const confirmPassword = formRef.current.confirmPassword.value

        // 🔐 Password check
        if (password !== confirmPassword) {
            setErrorMsg("Password doesn't match")
            setLoading(false)
            return
        }

        // 📦 Prepare data
        const userData = {
            name,
            email,
            mobile,
            role,
            password
        }

        try {
            const res = await fetch("http://localhost:7000/users", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(userData)
            })

            const data = await res.json()

            // ❌ backend error handling
            if (!res.ok) {
                throw new Error(data.message)
            }

            alert(data.message)

            // reset form
            formRef.current.reset()
            setErrorMsg("")
            navigate("/")

        } catch (err) {
            setErrorMsg(err.message || "Registration failed")
        } finally {
            setLoading(false)
        }
    }

    return (
        <div className="registrationBox">
            <form className="form" ref={formRef} onSubmit={handleSubmit}>

                <div className="tag title">
                    <h2>Registration</h2>
                </div>

                <div className="tag">
                    <label>User Name :</label>
                    <input type="text" name="uname" required />
                </div>

                <div className="tag">
                    <label>Role :</label>
                    <select name="role" required>
                        <option value="">Select Option</option>
                        <option value="admin">Admin</option>
                        <option value="user">User</option>
                    </select>
                </div>

                <div className="tag">
                    <label>Mobile :</label>
                    <input type="text" name="mobile" required />
                </div>

                <div className="tag">
                    <label>Email :</label>
                    <input type="email" name="email" required />
                </div>

                <div className="tag">
                    <label>Password :</label>
                    <input type="password" name="password" required />
                </div>

                <div className="tag">
                    <label>Confirm Password :</label>
                    <input type="password" name="confirmPassword" required />

                    {errorMsg && (
                        <div className="error" style={{ color: "red" }}>
                            {errorMsg}
                        </div>
                    )}
                </div>

                <div className="tag btn">
                    <button type="submit" disabled={loading}>
                        {loading ? "Registering..." : "Register"}
                    </button>
                </div>

                <div className="tag btn">
                    <Link className="link" to="/">
                        Go to Login
                    </Link>
                </div>

            </form>
        </div>
    )
}

export default Registration