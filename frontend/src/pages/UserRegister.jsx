import React from 'react';
import '../styles/auth.css';
import axios from 'axios';
import { API_BASE_URL } from '../config/api';

import Home from './general/Home';

import { useNavigate , Link } from 'react-router-dom';

const UserRegister = () => {
 
  const navigate = useNavigate();
  const handleSubmit = async (e) => {
    e.preventDefault();

    const fullName = e.target.fullName.value;
    const email = e.target.email.value;
    const password = e.target.password.value;

    const response =  await axios.post(`${API_BASE_URL}/api/auth/user/register`, {
      fullName,
      email,
      password
    }  , 
    {
       withCredentials:true
    }
  
  )
    .then((res) => {
      console.log("Success:", res.data);
      alert("User Registered Successfully");
        navigate("/");
    })
    .catch((err) => {
      console.log("Error:", err.response?.data || err.message);
      alert("Something went wrong" + err );
    }); 
 
  };

  return (
    <div className="auth-page">
      <div className="auth-container">
        <div className="auth-form">
          <h1>Join as User</h1>
          
          <form onSubmit={handleSubmit}>

            <div className="form-group">
              <h2>Full Name</h2>
              <input 
                name="fullName"  
                type="text" 
                placeholder="Enter your full name"
                required 
              />
            </div>

            <div className="form-group">
              <h2>Email</h2>
              <input 
                name="email" 
                type="email" 
                placeholder="your@email.com"
                required 
              />
            </div>

            <div className="form-group">
              <h2>Password</h2>
              <input 
                name="password"   
                type="password" 
                placeholder="Create password"
                required 
              />
            </div>

            <div className="form-group">
              <h2>Confirm Password</h2>
              <input 
                type="password"  
               
                placeholder="Confirm password"
                required 
              />
            </div>

            <button type="submit" className="submit-btn">
              Create Account
            </button>

          </form>

          <div className="links">
            <p>Already have an account? <Link to="user/login">Sign in</Link></p>
            <p>Restaurant owner? <Link to="food-partner/register">Join as Food Partner</Link></p>
          </div>

        </div>
      </div>
    </div>
  );
};

export default UserRegister;
