import React from 'react';
import '../styles/auth.css';
import axios from 'axios';
import { useNavigate, Link } from 'react-router-dom'; 
import { API_BASE_URL } from '../config/api';

 import { useState } from 'react';

const UserLogin = () => {

  const navigate = useNavigate();  


   const [loading  , setLoading ] = useState(false) ; 

  const handleSubmit = async (e) => {
    e.preventDefault();

    const email = e.target.email.value;
    const password = e.target.password.value;
  
     if(!email.includes("@")){
      alert("Please enter a valid email address");
      return; 

     }
setLoading(true) ; 

    try {
      const response = await axios.post(
        `${API_BASE_URL}/api/auth/user/login`,
        {
          email,
          password
        },
        {
          withCredentials: true   
        }
      );

      console.log("Login Success:", response.data);

      navigate("/");  

    } catch (err) {
      console.log(err.response?.data || err.message);
      alert("Login failed");
    } 

     finally{
       setLoading(false) ;
     }
  };

  return (
    <div className="auth-page">
      <div className="auth-container">
        <div className="auth-form">
          <h1>Welcome Back</h1>

          <form onSubmit={handleSubmit}>

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
                placeholder="Enter your password"
                required 
              />
            </div>

            
 
 

  <button type='submit'  className='submit-btn' disabled={loading}>
              {loading ? "Logging in..." : "Login"}
            </button>

          </form>

          <div className="links">
            <p>
              Don't have an account?{" "}
              <Link to="/user/register">Register as User</Link>
            </p>

            <p>
              Restaurant owner?{" "}
              <Link to="/food-partner/login">Partner Login</Link>
            </p>
          </div>

        </div>
      </div>
    </div>
  );
};

export default UserLogin;
