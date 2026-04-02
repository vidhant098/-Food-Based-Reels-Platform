import React from 'react';
import '../styles/auth.css';

const FoodPartnerLogin = () => {
  const handleSubmit = (e) => {
    e.preventDefault();
    // No logic needed - UI only
    console.log('Food Partner Login submitted');
  };

  return (
    <div className="auth-page">
      <div className="auth-container">
        <div className="auth-form">
          <h1>Partner Login</h1>
          
          <form onSubmit={handleSubmit}>
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
                placeholder="Enter your password"
                required 
              />
            </div>

            <button type="submit" className="submit-btn">
              Sign In as Partner
            </button>
          </form>

          <div className="links">
            <p>New partner? <a href="/food-partner/register">Register your restaurant</a></p>
            <p>Normal user? <a href="/user/login">User Login</a></p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FoodPartnerLogin;

