import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import BottomNav from '../../components/BottomNav';
import './UserProfile.css';

const UserProfile = () => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [posts, setPosts] = useState([]);
  const [activeTab, setActiveTab] = useState('posts');
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

        // Fetch user's posts
        try {
          const postsRes = await axios.get('http://localhost:3000/api/food/user', {
            withCredentials: true
          });
          setPosts(postsRes.data.foods || []);
        } catch (postErr) {
          console.log('No posts found or error fetching posts:', postErr);
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
    try {
      await axios.post('http://localhost:3000/api/auth/logout', {}, {
        withCredentials: true
      });
      navigate('/user/login');
    }
     catch (err) {
      console.log('Error logging out:', err);
    }
  };

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
              <button className="btn-follow" onClick={handleLogout}>
                Log Out
              </button>
            </div>
          </div>

          <div className="profile-stats">
            <div className="stat-item">
              <span className="stat-number">{posts.length}</span>
              <span className="stat-label">posts</span>
            </div>
            <div className="stat-item">
              <span className="stat-number">0</span>
              <span className="stat-label">followers</span>
            </div>
            <div className="stat-item">
              <span className="stat-number">0</span>
              <span className="stat-label">following</span>
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
          className={`tab-item ${activeTab === 'posts' ? 'active' : ''}`}
          onClick={() => setActiveTab('posts')}
        >
          <span className="tab-icon">▦</span>
          <span className="tab-label">Posts</span>
        </div>
        <div
          className={`tab-item ${activeTab === 'saved' ? 'active' : ''}`}
          onClick={() => setActiveTab('saved')}
        >
          <span className="tab-icon">★</span>
          <span className="tab-label">Saved</span>
        </div>
      </div>

      {/* Posts Grid */}
      {activeTab === 'posts' && (
        <div className="posts-grid">
          {posts.length > 0 ? (
            posts.map((post) => (
              <div key={post._id} className="post-item">
                {post.imageUrl ? (
                  <img
                    src={post.imageUrl}
                    alt={post.title}
                    className="post-image"
                  />
                ) : (
                  <div className="post-image" style={{ background: '#2a2a4a' }}></div>
                )}
                <div className="post-overlay">
                  <div className="post-stat">
                    <span className="post-stat-icon">♥</span>
                    <span>{post.likes?.length || 0}</span>
                  </div>
                  <div className="post-stat">
                    <span className="post-stat-icon">💬</span>
                    <span>{post.comments?.length || 0}</span>
                  </div>
                </div>
              </div>
            ))
          ) : (
            <div className="empty-posts">
              <div className="empty-icon">📷</div>
              <h3 className="empty-title">No Posts Yet</h3>
              <p className="empty-text">Start sharing your food adventures!</p>
            </div>
          )}
        </div>
      )}

      {/* Saved Tab */}
      {activeTab === 'saved' && (
        <div className="posts-grid">
          <div className="empty-posts">
            <div className="empty-icon">★</div>
            <h3 className="empty-title">No Saved Posts</h3>
            <p className="empty-text">Save posts you love to see them here!</p>
          </div>
        </div>
      )}

      <BottomNav />
    </div>
  );
};

export default UserProfile;
