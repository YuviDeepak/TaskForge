import React, { useRef, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'

const Login = ({ setUserObj }) => {

    const navigate = useNavigate()
    const formRef = useRef()

    const [errors, setErrors] = useState({})
    const [loading, setLoading] = useState(false)

    const handleSubmit = async (e) => {

        e.preventDefault()

        setErrors({})
        setLoading(true)

        const email = formRef.current.email.value.trim().toLowerCase()
        const password = formRef.current.password.value
        const role = formRef.current.role.value

        let newErrors = {}

        // Role Validation
        if (!role) {
            newErrors.role = "Please select role"
        }

        // Email Validation
        const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

        if (!email) {
            newErrors.email = "Email is required"
        }

        else if (!emailPattern.test(email)) {
            newErrors.email = "Enter valid email"
        }

        // Password Validation
        if (!password) {
            newErrors.password = "Password is required"
        }

        else if (password.length < 6) {
            newErrors.password = "Password must be at least 6 characters"
        }

        // Stop if validation errors exist
        if (Object.keys(newErrors).length > 0) {

            setErrors(newErrors)
            setLoading(false)
            return
        }

        try {

            const res = await fetch("https://taskforge-backend-hgwj.onrender.com/login", {

                method: "POST",

                headers: {
                    "Content-Type": "application/json"
                },

                body: JSON.stringify({
                    email,
                    password,
                    role
                })
            })

            const data = await res.json()

            // Backend Errors
            if (!res.ok) {

                setErrors({
                    api: data.message || "Login failed"
                })

                setLoading(false)
                return
            }

            setUserObj(data.response)

            localStorage.setItem(
                "user",
                JSON.stringify(data.response)
            )

            alert("Login Successful")

            navigate("/panel")

        }

        catch (err) {

            console.log(err)

            setErrors({
                api: "Server not reachable"
            })
        }

        finally {

            setLoading(false)
        }
    }

    return (

        <div className="registrationBox">

            <form ref={formRef} onSubmit={handleSubmit}>

                <div className="tag title">
                    <h2>Login</h2>
                </div>

                {/* Role */}
                <div className="tag">

                    <label>Role :</label>

                    <select name="role">

                        <option value="">
                            Select Role
                        </option>

                        <option value="admin">
                            Admin
                        </option>

                        <option value="user">
                            User
                        </option>

                    </select>

                    <span className="error">
                        {errors.role}
                    </span>

                </div>

                {/* Email */}
                <div className="tag">

                    <label>Email :</label>

                    <input
                        type="email"
                        name='email'
                    />

                    <span className="error">
                        {errors.email}
                    </span>

                </div>

                {/* Password */}
                <div className="tag">

                    <label>Password :</label>

                    <input
                        type="password"
                        name='password'
                    />

                    <span className="error">
                        {errors.password}
                    </span>

                </div>

                {/* API Error */}
                {
                    errors.api && (

                        <span
                            className="error"
                            style={{
                                display: "block",
                                marginTop: "5px"
                            }}
                        >
                            {errors.api}
                        </span>
                    )
                }

                {/* Login Button */}
                <div className="tag btn">

                    <button
                        type="submit"
                        disabled={loading}
                    >

                        {
                            loading
                                ? "Logging in..."
                                : "Login"
                        }

                    </button>

                </div>

                {/* Register Link */}
                <div className="tag btn">

                    <Link
                        className='link'
                        to='/register'
                    >
                        Create Account
                    </Link>

                </div>

            </form>

        </div>
    )
}

export default Login