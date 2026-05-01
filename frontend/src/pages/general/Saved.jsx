import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './Saved.css';
import BottomNav from '../../components/BottomNav';

const Saved = () => {
  const [savedItems, setSavedItems] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchSaved = async () => {
      try {
        const res = await axios.get('http://localhost:3000/api/food/saved', { withCredentials: true });
        setSavedItems(res.data.savedFoods || []);
      } catch (err) {
        console.error('Failed to fetch saved items', err);
      } finally {
        setLoading(false);
      }
    };
    fetchSaved();
  }, []);

  if (loading) {
    return (
      <div className="saved-loading">
        <div className="loading-spinner"></div>
      </div>
    );
  }

  return (
    <div className="saved-container">
      <div className="saved-header">
        <h2>Saved</h2>
      </div>

      {savedItems.length === 0 ? (
        <div className="empty-state">
          <div className="empty-emoji">★</div>
          <p className="empty-text">No saved posts yet</p>
        </div>
      ) : (
        <div className="saved-list">
          {savedItems.map((item) => (
            <div key={item._id} className="saved-card">
              {item.food?.video ? (
                <video
                  src={item.food.video}
                  className="saved-video"
                  muted
                  playsInline
                  preload="metadata"
                />
              ) : item.food?.imageUrl ? (
                <img 
                  src={item.food.imageUrl} 
                  alt={item.food?.name} 
                  className="saved-video"
                />
              ) : null}
              <div className="saved-overlay">
                <div className="saved-stat">
                  <span className="saved-stat-icon">★</span>
                  <span>Saved</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      <BottomNav />
    </div>
  );
};

export default Saved;
