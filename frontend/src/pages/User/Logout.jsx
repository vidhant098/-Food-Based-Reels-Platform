import React from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import './Logout.css';

const Logout = () => {
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await axios.post(
        'http://localhost:3000/api/auth/user/logout',
        {},
        { withCredentials: true }
      );
      
      // Clear local storage if any
      localStorage.removeItem('userToken');
      
      navigate('/user/login');
    } catch (err) {
      console.log('Error logging out:', err);
      // Even if there's an error, redirect to login
      navigate('/user/login');
    }
  };

  return (
    <div className="logout-container">
      <div className="logout-card">
        <h2>Log Out</h2>
        <p>Are you sure you want to log out?</p>
        <div className="logout-actions">
          <button className="btn-cancel" onClick={() => navigate(-1)}>
            Cancel
          </button>
          <button className="btn-logout" onClick={handleLogout}>
            Log Out
          </button>
        </div>
      </div>
    </div>
  );
};

export default Logout;
