import React from 'react';
import '../styles/auth.css';

const FoodPartnerRegister = () => {
  const handleSubmit = (e) => {
    e.preventDefault();
    // No logic needed - UI only
    console.log('Food Partner Register submitted');
  };

  return (
    <div className="auth-page">
      <div className="auth-container">
        <div className="auth-form">
          <h1>Join as Food Partner</h1>
          
          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <h2>Restaurant Name</h2>
              <input 
                type="text" 
                placeholder="Your restaurant name"
                required 
              />
            </div>

            <div className="form-group">
              <h2>Owner Name</h2>
              <input 
                type="text" 
                placeholder="Owner full name"
                required 
              />
            </div>

            <div className="form-group">
              <h2>Business Name</h2>
              <input 
                type="text" 
                placeholder="Business/Brand name"
                required 
              />
            </div>

            <div className="form-group">
              <h2>Business Address</h2>
              <input 
                type="text" 
                placeholder="Street, City, PIN"
                required 
              />
            </div>

            <div className="form-group">
              <h2>Email</h2>
              <input 
                type="email" 
                placeholder="restaurant@email.com"
                required 
              />
            </div>

            <div className="form-group">
              <h2>Password</h2>
              <input 
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
              Create Partner Account
            </button>
          </form>

          <div className="links">
            <p>Already registered? <a href="/food-partner/login">Sign in</a></p>
            <p>Normal user? <a href="/user/register">Join as User</a></p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FoodPartnerRegister;

