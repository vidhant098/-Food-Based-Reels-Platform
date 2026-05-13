import React, { useState, useEffect } from 'react';
import './Profile.css';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import BottomNav from '../../components/BottomNav';
import { API_BASE_URL } from '../../config/api';

const Profile = () => {
  const { id } = useParams();
  const [loading, setLoading] = useState(true);
  const [profile, setProfile] = useState(null);
  const [foods, setFoods] = useState([]);

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const res = await axios.get(
          `${API_BASE_URL}/api/food-partner/${id}`,
          { withCredentials: true }
        );
        setProfile(res.data.foodPartner);
        setFoods(res.data.foods || []);
      } catch (err) {
        console.log(err.response?.data || err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchProfile();
  }, [id]);

  // Get initials for profile placeholder
  const getInitials = (name) => {
    if (!name) return '🍕';
    const parts = name.trim().split(' ');
    if (parts.length >= 2) {
      return (parts[0][0] + parts[1][0]).toUpperCase();
    }
    return name.substring(0, 2).toUpperCase();
  };

  const totalAdded = foods.length;
  const totalServed = Math.floor(Math.random() * 5000) + totalAdded * 5;

  if (loading) {
    return (
      <div className="profile-container">
        <div className="loading">
          <div className="loading-spinner"></div>
        </div>
      </div>
    );
  }

  return (
    <div className="profile-container">
      {/* Header: Pic on left, Info on right - Instagram style */}
      <div className="header">
        <div className="profile-pic-wrapper">
          {profile?.profilePic ? (
            <img 
              src={profile.profilePic} 
              alt="Profile" 
              className="profile-pic"
            />
          ) : (
            <div className="profile-pic-placeholder">
              {getInitials(profile?.businessName)}
            </div>
          )}
        </div>

        <div className="business-info">
          <h2>{profile?.businessName || 'Restaurant Name'}</h2>
          <h3>{profile?.ownerName || 'Owner'}</h3>
          <p>{profile?.address || 'Address not set'}</p>
        </div>
      </div>

      {/* Stats Section */}
      <div className="stats-section">
        <div className="stat-card">
          <span className="stat-number">{totalAdded}</span>
          <div className="stat-label">Meals Added</div>
        </div>

        <div className="stat-card">
          <span className="stat-number">{totalServed.toLocaleString()}</span>
          <div className="stat-label">Customers Served</div>
        </div>
      </div>

      {/* Food Posts Grid */}
      {foods.length > 0 ? (
        <div className="video-grid">
          {foods.slice(0, 9).map((food) => (
            <div key={food._id} className="video-item">
              {food.video ? (
                <video autoPlay muted loop playsInline>
                  <source src={food.video} type="video/mp4" />
                </video>
              ) : food.imageUrl ? (
                <img 
                  src={food.imageUrl} 
                  alt={food.name}
                />
              ) : null}
              <div className="video-overlay">
                <span>{food.name}</span>
                {food.price && <strong>₹{food.price}</strong>}
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="empty-state">
          <div className="empty-emoji">🍽️</div>
          <h3 className="empty-title">No Food Posts Yet</h3>
          <p className="empty-text">Start adding your delicious food!</p>
        </div>
      )}

      <BottomNav />
    </div>
  );
};

export default Profile;
