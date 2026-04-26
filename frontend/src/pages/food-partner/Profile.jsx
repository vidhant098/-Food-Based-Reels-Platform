import React, { useState, useEffect } from 'react';
import './Profile.css';
import axios from 'axios';
import { useParams } from 'react-router-dom';

const Profile = () => {

  const { id } = useParams();   // ✅ URL से id लेना

  const [loading, setLoading] = useState(true);
  const [profile, setProfile] = useState(null);
  const [foods, setFoods] = useState([]);

  useEffect(() => {

    const fetchProfile = async () => {
      try {
        const res = await axios.get(
          `http://localhost:3000/api/food-partner/${id}`,
          { withCredentials: true }
        );

        setProfile(res.data.foodPartner);
        setFoods(res.data.foods || []);
  console.log(id);
      } catch (err) {
        console.log(err.response?.data || err.message);
      } finally {
        setLoading(false);   // ✅ loading बंद
      }
    };

    fetchProfile();

  }, [id]);

  const totalAdded = foods.length;
  const totalServed = Math.floor(Math.random() * 5000) + totalAdded * 5;

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
          src={profile?.profilePic} 
          alt="Profile" 
          className="profile-pic"
        />

        <div className="business-info">
          <h2>{profile?.businessName}</h2>
          <h3>{profile?.ownerName}</h3>
          <p>{profile?.address}</p>
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
            <video autoPlay muted loop playsInline>
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