import React, { useState, useEffect } from 'react';
import './Profile.css';

const Profile = () => {
  const [loading, setLoading] = useState(true);
  const [profile, setProfile] = useState(null);
  const [foods, setFoods] = useState([]);

  // Mock data (replace with real API fetches later)
  useEffect(() => {
    setTimeout(() => {
      setProfile({
        businessName: "Tasty Bites Restaurant",
        ownerName: "John Doe",
        address: "123 Food Street, City Center, FoodCity 12345",
        profilePic: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=300&fit=crop"
      });
      setFoods(Array.from({ length: 9 }, (_, i) => ({
        _id: `food${i}`,
        name: `Delicious Dish ${i + 1}`,
        video: '../../video.mp4', // Use local video.mp4 or replace with real URLs
        description: "Amazing food video reel"
      })));
      setLoading(false);
    }, 1500);
  }, []);

  const totalAdded = foods.length;
  const totalServed = Math.floor(Math.random() * 5000) + totalAdded * 5; // Mock served count

  if (loading) {
    return (
      <div className="profile-container">
        <div className="loading">Loading your profile...</div>
      </div>
    );
  }

  return (
    <div className="profile-container">
      <div className="header">
        <img 
          src={profile.profilePic} 
          alt="Profile Picture" 
          className="profile-pic"
        />
        <div className="business-info">
          <h2>{profile.businessName}</h2>
          <h3>{profile.ownerName}</h3>
          <p>{profile.address}</p>
        </div>
      </div>

      <div className="stats-section">
        <div className="stat-card">
          <span className="stat-number">{totalAdded}</span>
          <div className="stat-label">Total Meals Added</div>
        </div>
        <div className="stat-card">
          <span className="stat-number">{totalServed.toLocaleString()}</span>
          <div className="stat-label">Total Customer Serves</div>
        </div>
      </div>

      <div className="video-grid">
        {foods.slice(0, 9).map((food) => (
          <div key={food._id} className="video-item">
            <video 
              autoPlay 
              muted 
              loop 
              playsInline
              preload="metadata"
            >
              <source src={food.video} type="video/mp4" />
            </video>
            <div className="video-overlay">
              {food.name}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Profile;

