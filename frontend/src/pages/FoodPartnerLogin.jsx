import React, { useState } from 'react';
import '../styles/auth.css';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';

const FoodPartnerLogin = () => {

  const navigate = useNavigate();

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    const email = e.target.email.value;
    const password = e.target.password.value;

    setError("");
    setLoading(true);   

    try {
      const response = await axios.post(
        "http://localhost:3000/api/auth/foodpartner/login",
        { email, password },
        { withCredentials: true }
      );

      console.log("Login Success:", response.data);
       alert("login successfull")
      navigate("/foodPartnerOwn/profile");

    } catch (err) 
    {
      const message = err.response?.data?.message || "Login failed"; 

       console.log(err )
      setError(message); 
       alert('login failed')
    }
     finally {
      setLoading(false);   
    }
  };

  return (
    <div className="auth-page">
      <div className="auth-container">
        <div className="auth-form">
          <h1>Partner Login</h1>
          
          <form onSubmit={handleSubmit}>

            {/* ✅ Show error */}
            {error && <p className="error">{error}</p>}

            <div className="form-group">
              <h2>Email</h2>
              <input 
                name="email"
                type="email" 
                placeholder="restaurant@email.com"
                required 
              />
            </div>

            <div className="form-group">
              <h2>Password</h2>
              <input 
                name="password"
                type="password" 
                placeholder="Enter your password"
                required 
              />
            </div>

            {/* ✅ Loading button */}
            <button 
              type="submit" 
              className="submit-btn"
              disabled={loading}
            >
              {loading ? "Logging in..." : "Log in as Partner"}
            </button>

          </form>

          <div className="links">
            <p>
              New partner? <Link to="/food-partner/register">Register here</Link>
            </p>
            <p>
              Normal user? <Link to="/user/login">User Login</Link>
            </p>
          </div>

        </div>
      </div>
    </div>
  );
};

export default FoodPartnerLogin;