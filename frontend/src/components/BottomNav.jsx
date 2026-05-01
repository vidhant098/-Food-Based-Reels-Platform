import React from 'react';
import { useLocation, Link } from 'react-router-dom';
import './BottomNav.css';

const BottomNav = ({ isDark }) => {
  const location = useLocation();
  const path = location.pathname;

  return (
    <nav className={`bottom-nav ${isDark ? 'dark' : ''}`}>
      <Link to="/" className={`nav-item ${path === '/' ? 'active' : ''}`}>
        <svg viewBox="0 0 24 24" width="24" height="24" fill="currentColor">
          <path d="M12 2.1L2 10v11h8v-7h4v7h8V10L12 2.1z" />
        </svg>
        <span>Home</span>
      </Link>

      <Link to="/saved" className={`nav-item ${path === '/saved' ? 'active' : ''}`}>
        <svg viewBox="0 0 24 24" width="24" height="24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M19 21l-7-5-7 5V5a2 2 0 012-2h10a2 2 0 012 2z" />
        </svg>
        <span>Saved</span>
      </Link>

      <Link to="/food-partner/login" className={`nav-item ${path === '/create-food' ? 'active' : ''}`}>
        <svg viewBox="0 0 24 24" width="24" height="24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <rect x="3" y="3" width="18" height="18" rx="2" ry="2" />
          <line x1="12" y1="8" x2="12" y2="16" />
          <line x1="8" y1="12" x2="16" y2="12" />
        </svg>
        <span> Add food   <p> Become   partner   </p> </span> 
        
      </Link>

      <Link to="/user/profile" className={`nav-item ${path.startsWith('/food-partner') ? 'active' : ''}`}>
        <svg viewBox="0 0 24 24" width="24" height="24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M20 21v-2a4 4 0 00-4-4H8a4 4 0 00-4 4v2" />
          <circle cx="12" cy="7" r="4" />
        </svg>
        <span>Profile</span>
      </Link>
    </nav>
  );
};

export default BottomNav;

