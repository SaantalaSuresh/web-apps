import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import bcrypt from 'bcryptjs';

const Login = () => {
    const navigate = useNavigate();
    const isLogin = JSON.parse(localStorage.getItem("isLogin")); // Parse the stored value

    const [userData, setUserData] = useState({
        username: "",
        password: ""
    });
    const [error, setError] = useState(null);

    const onLogin = (e) => {
        e.preventDefault();
        const { username, password } = userData;
        if (username === "" || password === "") {
            setError("Username and password are required");
            return;
        }

        const storedUser = JSON.parse(localStorage.getItem("user"));
        if (!storedUser) {
            setError("User not found");
            return;
        }

        const isPasswordMatch = bcrypt.compareSync(password, storedUser.password);
        if (!isPasswordMatch) {
            setError("Invalid username or password");
            return;
        }

        alert("Logged in successfully!");
        setUserData({ username: "", password: "" });
        setError(null);
        navigate("/"); 
        localStorage.setItem("isLogin", JSON.stringify(true));
    };

   
    useEffect(() => {
        if (isLogin) {
            navigate("/");
        }
    }, [isLogin, navigate]);

 

    return (

        
        <form className='register-container' onSubmit={onLogin}>
            <h1 className='heading'>Login</h1>
            <div className='input-container'>
                <label htmlFor='name'>Username</label>
                <input
                    placeholder='Enter Your Username...'
                    id='name'
                    type='text'
                    onChange={(e) => setUserData(prev => ({ ...prev, username: e.target.value }))}
                    value={userData.username}
                    className='input-box'
                />
                <label htmlFor='password'>Password</label>
                <input
                    placeholder='Enter your password'
                    id='password'
                    onChange={(e) => setUserData(prev => ({ ...prev, password: e.target.value }))}
                    type='password'
                    value={userData.password}
                    className='input-box'
                />
                <div>
                <button type='submit' className='register-btn'>Login</button>
                </div>
                {error && <p className='error-message'>{error}</p>}
            </div>
            <p>Create account? <span><Link to="/register" className='Link'>Register</Link></span></p>
        </form>
    );
};

export default Login;
