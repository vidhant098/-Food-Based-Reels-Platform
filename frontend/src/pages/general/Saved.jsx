import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './Saved.css';
import BottomNav from '../../components/BottomNav';

const Saved = () => {
  const [savedItems, setSavedItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isDark, setIsDark] = useState(false);

  useEffect(() => {
    const theme = localStorage.getItem('theme');
    if (theme === 'dark') setIsDark(true);
  }, []);

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

  const toggleTheme = () => {
    const newDark = !isDark;
    setIsDark(newDark);
    localStorage.setItem('theme', newDark ? 'dark' : 'light');
  };

  if (loading) {
    return (
      <div className={`saved-loading ${isDark ? 'dark' : ''}`}>
        Loading saved...
      </div>
    );
  }

  return (
    <div className={`saved-container ${isDark ? 'dark' : ''}`}>
      <div className="saved-header">
        <h2>Saved</h2>
        <button className="theme-toggle" onClick={toggleTheme}>
          {isDark ? '☀️' : '🌙'}
        </button>
      </div>

      {savedItems.length === 0 ? (
        <div className="empty-state">No saved items yet.</div>
      ) : (
        <div className="saved-list">
          {savedItems.map((item) => (
            <div key={item._id} className="saved-card">
              <video
                src={item.food?.video}
                className="saved-video"
                muted
                playsInline
                preload="metadata"
              />
              <div className="saved-info">
                <h4>{item.food?.name}</h4>
                <p>{item.food?.description}</p>
              </div>
            </div>
          ))}
        </div>
      )}

      <BottomNav isDark={isDark} />
    </div>
  );
};

export default Saved;

