import React from 'react';
import '../styles/auth.css';
import axios from 'axios';

const UserRegister = () => {

  const handleSubmit = (e) => {
    e.preventDefault();

    const fullName = e.target.fullName.value;
    const email = e.target.email.value;
    const password = e.target.password.value;

    axios.post("http://localhost:3000/api/auth/user/register", {
      fullName,
      email,
      password
    })
    .then((res) => {
      console.log("Success:", res.data);
      alert("User Registered Successfully");
    })
    .catch((err) => {
      console.log("Error:", err.response?.data || err.message);
      alert("Something went wrong");
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
                name="fullName"   // ✅ IMPORTANT
                type="text" 
                placeholder="Enter your full name"
                required 
              />
            </div>

            <div className="form-group">
              <h2>Email</h2>
              <input 
                name="email"   // ✅ IMPORTANT
                type="email" 
                placeholder="your@email.com"
                required 
              />
            </div>

            <div className="form-group">
              <h2>Password</h2>
              <input 
                name="password"   // ✅ IMPORTANT
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
            <p>Already have an account? <a href="/user/login">Sign in</a></p>
            <p>Restaurant owner? <a href="/food-partner/register">Join as Food Partner</a></p>
          </div>

        </div>
      </div>
    </div>
  );
};

export default UserRegister;