import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import bcrypt from 'bcryptjs';
import './register.css';

const Register = () => {
    const navigate = useNavigate();
    
    const isLogin = JSON.parse(localStorage.getItem("isLogin"));

    const [user, setUser] = useState({
        username: "",
        password: "",
        gender: "Male"
    });

    const [error, setError] = useState({
        nameError: false,
        passwordError: false
    });

    const onRegister = (e) => {
        e.preventDefault();
        const { username, password, gender } = user;

        if (username === "" || password === "") {
            setError({
                nameError: username === "",
                passwordError: password === ""
            });
            return;
        } else {
            setError({
                nameError: false,
                passwordError: false
            });
        }

        const hashedPassword = bcrypt.hashSync(password, 10);
        const userData = { username, password: hashedPassword, gender };
        localStorage.setItem("user", JSON.stringify(userData));

        alert("User Registered Successfully!");
        setUser({
            username: "",
            password: "",
            gender: "Male"
        });

        navigate("/login");
    };

  
    useEffect(() => {
        if (isLogin) {
            navigate("/");
        }
    }, [isLogin, navigate]);

  return (
        <form className='register-container' onSubmit={onRegister}>
            <h1 className='heading'>Register</h1>
            <div className='input-container'>
                <label htmlFor="name">Name</label>
            <input placeholder='Enter Your Name...' type='text' className='input-box'  id="name" value={user.username}
            onChange={(e)=>setUser(prev=>({...prev,username:e.target.value}))}/>
            {error.nameError && <p className='error-message'>*required</p>}
            <label htmlFor="password">Password</label>
            <input placeholder='Enter your password' type='password' className='input-box' value={user.password} id="password" 
            onChange={(e)=>setUser(prev=>({...prev,password:e.target.value}))}/>
            {error.passwardError && <p className='error-message'>*required</p>}
            <div >
          <h1 className="gender-field-heading" >Gender</h1>
          <input type="radio" name="gender" id="genderMale" value="Male" checked className='radio' onChange={(e)=>setUser(prev=>({...prev,gender:e.target.value}))}/>
          <label htmlFor="genderMale">Male</label>
          <input type="radio" name="gender" id="genderFemale" value="Female" className='radio' onChange={(e)=>setUser(prev=>({...prev,gender:e.target.value}))}/>
          <label htmlFor="genderFemale">Female</label>
        </div>
            <div>
                <button type='submit' className='register-btn'>Register</button>
            </div>
            </div>
            <p>Already have an account? <span> <Link to="/login" className='Link'>Login</Link></span></p>

        </form>
  )
}

export default Register
