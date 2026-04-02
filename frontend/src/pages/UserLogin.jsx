import React from 'react';
import '../styles/auth.css';

const UserLogin = () => {
  const handleSubmit = (e) => {
    e.preventDefault();
    // No logic needed - UI only
    console.log('User Login submitted');
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
                type="email" 
                placeholder="your@email.com"
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
              Sign In
            </button>
          </form>

          <div className="links">
            <p>Don't have an account? <a href="/user/register">Register as User</a></p>
            <p>Restaurant owner? <a href="/food-partner/login">Partner Login</a></p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserLogin;

