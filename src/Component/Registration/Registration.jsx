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

        // Name Validation
        if (name.length < 3) {
            setErrorMsg("Name must be at least 3 characters")
            setLoading(false)
            return
        }

        // Email Validation
        const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

        if (!emailPattern.test(email)) {
            setErrorMsg("Enter valid email")
            setLoading(false)
            return
        }

        // Mobile Validation
        const mobilePattern = /^[0-9]{10}$/

        if (!mobilePattern.test(mobile)) {
            setErrorMsg("Enter valid 10 digit mobile number")
            setLoading(false)
            return
        }

        // Password Validation
        if (password.length < 6) {
            setErrorMsg("Password must be at least 6 characters")
            setLoading(false)
            return
        }

        // Confirm Password Validation
        if (password !== confirmPassword) {
            setErrorMsg("Password doesn't match")
            setLoading(false)
            return
        }

        const userData = {
            name,
            email,
            mobile,
            role,
            password
        }

        try {

            const res = await fetch("https://taskforge-backend-hgwj.onrender.com/users", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(userData)
            })

            const data = await res.json()

            // If email already exists
            if (!res.ok) {

                // Backend duplicate email response
                if (data.errors?.email) {
                    alert(data.errors.email)
                }

                // Backend normal message
                else if (data.message) {
                    alert(data.message)
                }

                else {
                    alert("Registration failed")
                }

                setLoading(false)
                return
            }

            alert(data.message)

            formRef.current.reset()

            navigate("/")

        } catch (err) {

            console.log(err)

            alert("Something went wrong")

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

                    <input type="text" name="email" required />
                </div>

                <div className="tag">
                    <label>Password :</label>

                    <input type="password" name="password" required />
                </div>

                <div className="tag">
                    <label>Confirm Password :</label>

                    <input type="password" name="confirmPassword" required />

                    {
                        errorMsg && (
                            <div
                                className="error"
                                style={{
                                    color: "red",
                                    marginTop: "5px"
                                }}
                            >
                                {errorMsg}
                            </div>
                        )
                    }
                </div>

                <div className="tag btn">

                    <button type="submit" disabled={loading}>

                        {
                            loading
                                ? "Registering..."
                                : "Register"
                        }

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