import React, { useState } from 'react';
import '../styles/auth.css';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';

const FoodPartnerRegister = () => { 

  const [loading , setLoading] = useState(false); 
  const [error, setError] = useState(""); 

  const navigate = useNavigate(); 

  const handleSubmit = async (e) => {  

    e.preventDefault();

    const ownerName = e.target.name.value; 
    const businessName = e.target.businessName.value;
    const email = e.target.email.value; 
    const phone = e.target.phone.value;
    const address  = e.target.address.value;
    const password  = e.target.password.value; 
    const confirmPassword = e.target[6].value;

    if (password !== confirmPassword) {
      setError("Passwords do not match");
      return;
    }

    setError("");
    setLoading(true);   

    try{
 
      const response = await axios.post(   
        "http://localhost:3000/api/auth/food-partner/login" ,
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

      navigate('/');   // ✅ stays same

    } 
    catch(err){ 
      console.log(err);
      setError(err.response?.data?.message || "Registration failed"); // ✅ added
    }
    finally {
      setLoading(false);   
    }

    console.log('Food Partner Register submitted');
  };

  return (
    <div className="auth-page">
      <div className="auth-container">
        <div className="auth-form">
          <h1>Join as Food Partner</h1>
          
          <form onSubmit={handleSubmit}>

            {error && <p className="error">{error}</p>}

            <div className="form-group">
              <h2>Business name </h2>
              <input 
                type="text"  
                name='businessName'
                placeholder="busines name/brand name"
                required 
              />
            </div>

            <div className="form-group">
              <h2> OwnerName</h2>
              <input
                type="text" 
                name="name" 
                placeholder="Owner full name"
                required 
              />
            </div>
 
           <div className="form-group">
              <h2>Email</h2>
              <input 
                type="email"  
                name='email'
                placeholder="restaurant@email.com"
                required 
              />
            </div> 

            <div className="form-group">
              <h2>Phone</h2>
              <input 
                type="number"  
                name='phone'
                placeholder="Phone number"
                required 
              />
            </div>

            <div className="form-group">
              <h2>Business Address</h2>
              <input 
                type="text" 
                name='address'
                placeholder="Street, City, PIN"
                required 
              />
            </div>

            <div className="form-group">
              <h2>Password</h2>
              <input 
                type="password"  
                name='password'
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

            {/* ✅ loading button */}
            <button 
              type="submit" 
              className="submit-btn"
              disabled={loading}
            >
              {loading ? "Creating Account..." : "Create Partner Account"}
            </button>

          </form>

          <div className="links">
            <p>Already registered? <Link to='/food-partner/login'>Sign in</Link></p>
            <p>Normal user? <Link to="/user/register"></Link></p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FoodPartnerRegister;