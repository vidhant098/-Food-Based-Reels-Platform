import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import BottomNav from '../../components/BottomNav';
import './UserProfile.css';

const UserProfile = () => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [likedVideos, setLikedVideos] = useState([]);
  const [savedVideos, setSavedVideos] = useState([]);
  const [activeTab, setActiveTab] = useState('liked');
  const [loggingOut, setLoggingOut] = useState(false);
  const [logoutError, setLogoutError] = useState('');
  const navigate = useNavigate();

  // Get initials for profile placeholder
  const getInitials = (name) => {
    if (!name) return '?';
    const parts = name.trim().split(' ');
    if (parts.length >= 2) {
      return (parts[0][0] + parts[1][0]).toUpperCase();
    }
    return name.substring(0, 2).toUpperCase();
  };

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        // Fetch user profile
        const userRes = await axios.get('http://localhost:3000/api/auth/me', {
          withCredentials: true
        });
        setUser(userRes.data.user);

        // Fetch liked and saved videos
        try {
          const [likedRes, savedRes] = await Promise.all([
            axios.get('http://localhost:3000/api/food/liked', {
              withCredentials: true
            }),
            axios.get('http://localhost:3000/api/food/saved', {
              withCredentials: true
            })
          ]);

          setLikedVideos(
            (likedRes.data.likedFoods || [])
              .map((item) => item.food)
              .filter(Boolean)
          );
          setSavedVideos(
            (savedRes.data.savedFoods || [])
              .map((item) => item.food)
              .filter(Boolean)
          );
        } catch (videoErr) {
          console.log('Error fetching liked/saved videos:', videoErr);
        }
      } catch (err) {
        if (err.response?.status === 401) {
          alert('You are not logged in yet');
       
          navigate('/user/login');
        } else {
          console.log('Error fetching user:', err);
        }
      } finally {
        setLoading(false);
      }
    };

    fetchUserData();
  }, [navigate]);

  const handleLogout = async () => {
    setLoggingOut(true);
    setLogoutError('');
    try {
      await axios.post('http://localhost:3000/api/auth/user/logout', {}, {
        withCredentials: true
      });
      localStorage.removeItem('userToken');
      localStorage.removeItem('theme');
      setUser(null);
      navigate('/user/login', { replace: true });
    }
     catch (err) {
      console.log('Error logging out:', err);
      setLogoutError('Logout failed. Please try again.');
    } finally {
      setLoggingOut(false);
    }
  };

  const renderVideoGrid = (items, emptyIcon, emptyTitle, emptyText) => (
    <div className="posts-grid">
      {items.length > 0 ? (
        items.map((item) => (
          <div key={item._id} className="post-item">
            {item.video ? (
              <video
                src={item.video}
                className="post-image"
                muted
                playsInline
                preload="metadata"
              />
            ) : item.imageUrl ? (
              <img
                src={item.imageUrl}
                alt={item.name || item.title || 'Food video'}
                className="post-image"
              />
            ) : (
              <div className="post-image post-placeholder">
                {item.name?.slice(0, 1) || 'F'}
              </div>
            )}
            <div className="post-overlay">
              <div className="post-stat">
                <span className="post-stat-icon">♥</span>
                <span>{item.likeCount || 0}</span>
              </div>
              <div className="post-stat">
                <span className="post-stat-icon">▣</span>
                <span>Video</span>
              </div>
            </div>
            <div className="post-caption">
              <span>{item.name || 'Food video'}</span>
              {item.price ? <strong>Rs {item.price}</strong> : null}
            </div>
          </div>
        ))
      ) : (
        <div className="empty-posts">
          <div className="empty-icon">{emptyIcon}</div>
          <h3 className="empty-title">{emptyTitle}</h3>
          <p className="empty-text">{emptyText}</p>
        </div>
      )}
    </div>
  );

  if (loading) {
    return (
      <div className="user-profile-container">
        <div className="profile-loading">
          <div className="loading-spinner"></div>
        </div>
        <BottomNav />
      </div>
    );
  }

  if (!user) {
    return (
      <div className="user-profile-container">
        <div className="profile-error">
          <p className="error-text">Unable to load profile</p>
          <p className="error-subtext">Please try logging in again</p>
          <button className="btn-edit-profile" onClick={() => navigate('/user/login')}>
            Go to Login
          </button>
        </div>
        <BottomNav />
      </div>
    );
  }

  return (
    <div className="user-profile-container">
      {/* Profile Header */}
      <header className="profile-header">
        <div className="profile-pic-container">
          <div className="profile-pic-wrapper">
            {user.profilePic ? (
              <img
                src={user.profilePic}
                alt={user.fullName}
                className="profile-pic"
              />
            ) : (
              <div className="profile-pic-placeholder">
                {getInitials(user.fullName)}
              </div>
            )}
          </div>
        </div>

        <div className="profile-info">
          <div className="profile-username">
            <h1 className="username">{user.userName || user.email?.split('@')[0]}</h1>
            <div className="profile-actions">
              <button className="btn-edit-profile" onClick={() => navigate('/user/edit')}>
                Edit Profile
              </button>
              <button
                type="button"
                className="btn-follow btn-logout"
                onClick={handleLogout}
                disabled={loggingOut}
                aria-busy={loggingOut}
              >
                {loggingOut ? 'Logging out...' : 'Log Out'}
              </button>
            </div>
            {logoutError && <p className="logout-feedback">{logoutError}</p>}
          </div>

          <div className="profile-stats">
            <div className="stat-item">
              <span className="stat-number">{likedVideos.length}</span>
              <span className="stat-label">liked</span>
            </div>
            <div className="stat-item">
              <span className="stat-number">{savedVideos.length}</span>
              <span className="stat-label">saved</span>
            </div>
            <div className="stat-item">
              <span className="stat-number">{likedVideos.length + savedVideos.length}</span>
              <span className="stat-label">videos</span>
            </div>
          </div>

          <div className="profile-bio">
            <p className="bio-name">{user.fullName}</p>
            <p className="bio-text">🍕 Food Lover | Exploring tasty places 🌮</p>
          </div>
        </div>
      </header>

      {/* Story Highlights */}
      <div className="story-highlights">
        <div className="highlight-item">
          <div className="highlight-circle">
            <div className="highlight-inner">
              <span className="highlight-emoji">📸</span>
            </div>
          </div>
          <span className="highlight-title">Highlights</span>
        </div>
      </div>

      {/* Content Tabs */}
      <div className="content-tabs">
        <div
          className={`tab-item ${activeTab === 'liked' ? 'active' : ''}`}
          onClick={() => setActiveTab('liked')}
        >
          <span className="tab-icon">♥</span>
          <span className="tab-label">Liked Videos</span>
        </div>
        <div
          className={`tab-item ${activeTab === 'saved' ? 'active' : ''}`}
          onClick={() => setActiveTab('saved')}
        >
          <span className="tab-icon">★</span>
          <span className="tab-label">Saved Videos</span>
        </div>
      </div>

      {activeTab === 'liked' &&
        renderVideoGrid(
          likedVideos,
          '♥',
          'No Liked Videos',
          'Videos you like will show here.'
        )}

      {activeTab === 'saved' &&
        renderVideoGrid(
          savedVideos,
          '★',
          'No Saved Videos',
          'Save videos you love to see them here.'
        )}

      <BottomNav />
    </div>
  );
};

export default UserProfile;
