import React, { useState } from 'react';
import '../styles/auth.css';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios'; 
import { API_BASE_URL } from '../config/api';

const FoodPartnerRegister = () => { 

  const [loading , setLoading] = useState(false); 
  const [error, setError] = useState(""); 

  const navigate = useNavigate();

  const handleSubmit = async (e) => {  
    e.preventDefault();

    const ownerName = e.target.ownerName.value; 
    const businessName = e.target.businessName.value;
    const email = e.target.email.value; 
    const phone = e.target.phone.value;
    const address  = e.target.address.value;
    const password  = e.target.password.value; 
    const confirmPassword = e.target.confirmPassword.value;

    // ✅ password validation (important)
    if (password !== confirmPassword) {
      setError("Passwords do not match");
      return;
    }

    setError("");
    setLoading(true);   

    try{
      const response = await axios.post(   
        `${API_BASE_URL}/api/auth/foodpartner/register`,
        {  
          ownerName,
          businessName,
          email,
          phone,
          address,
          password
        }, 
        { withCredentials: true } 
      );

      console.log(response.data);

      navigate('/foodPartnerOwn/profile');  

    } 
    catch(err){ 
      console.log(err);
      alert(err)
      setError(err.response?.data?.message || "Registration failed"); 
    }
    finally {
      setLoading(false);   
    }
  };

  return (
    <div className="auth-page">
      <div className="auth-container">
        <div className="auth-form">
          <h1>Join as Food Partner</h1>
          
          <form onSubmit={handleSubmit}>

            {error && <p className="error">{error}</p>}

            <div className="form-group">
              <h2>Business name</h2>
              <input 
                type="text"  
                name="businessName"
                placeholder="Business name / brand name"
                required 
              />
            </div>

            <div className="form-group">
              <h2>Owner Name</h2>
              <input
                type="text" 
                name="ownerName" 
                placeholder="Owner full name"
                required 
              />
            </div>
 
            <div className="form-group">
              <h2>Email</h2>
              <input 
                type="email"  
                name="email"
                placeholder="restaurant@email.com"
                required 
              />
            </div> 

            <div className="form-group">
              <h2>Phone</h2>
              <input 
                type="text"   // ✅ better than number
                name="phone"
                placeholder="Phone number"
                required 
              />
            </div>

            <div className="form-group">
              <h2>Business Address</h2>
              <input 
                type="text" 
                name="address"
                placeholder="Street, City, PIN"
                required 
              />
            </div>

            <div className="form-group">
              <h2>Password</h2>
              <input 
                type="password"  
                name="password"
                placeholder="Create password"
                required 
              />
            </div>

            <div className="form-group">
              <h2>Confirm Password</h2>
              <input  
                type="password" 
                name="confirmPassword"
                placeholder="Confirm password"
                required 
              />
            </div> 

            <button 
              type="submit" 
              className="submit-btn"
              disabled={loading}
            >
              {loading ? "Creating Account..." : "Create Partner Account"}
            </button>

          </form>

          <div className="links">
            <p>Already registered? <Link to="/food-partner/login">Sign in</Link></p>
            <p>Normal user? <Link to="/user/register">Register here</Link></p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FoodPartnerRegister;
