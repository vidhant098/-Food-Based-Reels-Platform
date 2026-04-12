import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './Home.css';

const API_BASE = 'http://localhost:5000/api'; // Adjust if different

const Home = () => {
  const [foods, setFoods] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isDark, setIsDark] = useState(false);

  useEffect(() => {
    const fetchFoods = async () => {
      try {
        // Mock auth token; replace with real from context/login
        const token = localStorage.getItem('userToken') || 'mock-token';
        const response = await axios.get(`${API_BASE}/food`, {
          headers: { Authorization: `Bearer ${token}` },
        });
          
        setFoods(response.data.foodItems || []);
      } catch (err) {
        console.error('API error, using mock:', err);
        // Fallback mock data with root video.mp4
        setFoods([
          {
            _id: '1',
            name: 'Delicious Pizza',
            description: 'Freshly baked pizza with cheese, pepperoni, and veggies. Perfect for your cravings!',
            video: '/video.mp4'
          },
          {
            _id: '2',
            name: 'Burger King',
            description: 'Juicy beef burger with special sauce. Try our signature recipe today.',
            video: '/video.mp4'
          },
          {
            _id: '3',
            name: 'Veggie Bowl',
            description: 'Healthy quinoa bowl with fresh vegetables and dressing. Nutritious and tasty!',
            video: '/video.mp4'
          }
        ]);
      } finally {
        setLoading(false);
      }
    };

    fetchFoods();
  }, []);

  useEffect(() => {
    const saved = localStorage.getItem('theme');
    if (saved === 'dark') {
      setIsDark(true);
    }
  }, []);

  const toggleTheme = () => {
    const newDark = !isDark;
    setIsDark(newDark);
    localStorage.setItem('theme', newDark ? 'dark' : 'light');
  };

  if (loading) {
    return <div className="loading">Loading reels...</div>;
  }

  return (
    <div className={`reel-container ${isDark ? 'dark' : ''}`}>
      <button className="theme-toggle" onClick={toggleTheme}>
        {isDark ? '☀️' : '🌙'}
      </button>
      {foods.map((food) => (
        <section key={food._id} className={`reel-item ${isDark ? 'dark' : ''}`}>
          <video
            src={food.video}
            autoPlay
            loop
            muted
            playsInline
            className="reel-video"
          />
          <div className={`overlay ${isDark ? 'dark' : ''}`}>
            <h3 className="food-name">{food.name}</h3>
            <p className="food-desc">{food.description}</p>
            <button className="visit-btn" onClick={() => alert('Visit Profile!')}>
              Visit Profile
            </button>
          </div>
        </section>
      ))}
    </div>
  );
};

export default Home;

