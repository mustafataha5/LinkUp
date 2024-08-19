import React, { useState } from 'react'

const Register = () => {
    const [firstName, setFirstName] = useState([])
    const [lastName, setLastName] = useState([])
    const [email, setEmail] = useState([])
    const [password, setPassword] = useState([])
    const [confirmPassword, setConfirm] = useState([])
    const [birthday, setBirthday] = useState([])
    const [gender, setGender] = useState([])

    const handleSubmit = e =>{
        e.preventDefault()
        setFirstName("")
        setLastName("")
        setEmail("")
        setPassword("")
        setConfirm("")
        setBirthday("")
        setGender("")
    }
  return (
    <div class="form-container">
        <h1>Register</h1>
        <form onSubmit={handleSubmit}>
                <div className="form-group">
                    <label htmlFor="firstName">First Name:</label>
                    <input 
                        type="text" 
                        id="firstName" 
                        name="firstName" 
                        value={firstName}
                        onChange={e => setFirstName(e.target.value)} 
                        required 
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="lastName">Last Name:</label>
                    <input 
                        type="text" 
                        id="lastName" 
                        name="lastName" 
                        value={lastName}
                        onChange={e => setLastName(e.target.value)} 
                        required 
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="email">Email:</label>
                    <input 
                        type="email" 
                        id="email" 
                        name="email" 
                        value={email}
                        onChange={e => setEmail(e.target.value)}  
                        required 
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="password">Password:</label>
                    <input 
                        type="password" 
                        id="password" 
                        name="password" 
                        value={password}
                        onChange={e => setPassword(e.target.value)} 
                        required 
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="confirmPassword">Confirm Password:</label>
                    <input 
                        type="password" 
                        id="confirmPassword" 
                        name="confirmPassword" 
                        value={confirmPassword}
                        onChange={e => setConfirm(e.target.value)} 
                        required 
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="birthday">Birthday:</label>
                    <input 
                        type="date" 
                        id="birthday" 
                        name="birthday" 
                        value={birthday}
                        onChange={e => setBirthday(e.target.value)} 
                        required 
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="gender">Gender:</label>
                    <select 
                        id="gender" 
                        name="gender" 
                        value={gender}
                        onChange={e => setGender(e.target.value)} 
                        required
                    >
                        <option value="" disabled>Select your gender</option>
                        <option value="male">Male</option>
                        <option value="female">Female</option>
                    </select>
                </div>
                <button type="submit" className="btn">Submit</button>
            </form>
    </div>
  )
}

export default Register
