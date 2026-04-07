import React from 'react';
import '../styles/auth.css';
import axios from 'axios';
import { useNavigate, Link } from 'react-router-dom';

const UserLogin = () => {

  const navigate = useNavigate();   // ✅ correct

  const handleSubmit = async (e) => {
    e.preventDefault();

    const email = e.target.email.value;
    const password = e.target.password.value;

    try {
      const response = await axios.post(
        "http://localhost:3000/api/auth/user/login",
        {
          email,
          password
        },
        {
          withCredentials: true   // ✅ cookie store
        }
      );

      console.log("Login Success:", response.data);

      navigate("/");   // ✅ redirect after login

    } catch (err) {
      console.log(err.response?.data || err.message);
      alert("Login failed");
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
                name="email"   // ✅ important
                type="email" 
                placeholder="your@email.com"
                required 
              />
            </div>

            <div className="form-group">
              <h2>Password</h2>
              <input 
                name="password"   // ✅ important
                type="password" 
                placeholder="Enter your password"
                required 
              />
            </div>

            <button type="submit" className="submit-btn">
              Login
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