import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './Home.css';

// Adjust if different

const Home = () => {
  const [foods, setFoods] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isDark, setIsDark] = useState(false);

  useEffect(() => {
    const fetchFoods = async () => {
      try {
        // Mock auth token; replace with real from context/login
        const response  = await axios.get("http://localhost:3000/api/food" , {
           withCredentials: true,
        }) 
          
        setFoods(response.data.foodItems || []);
      } catch (err) {
        console.error('API error, using mock:', err);
     
        
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
            controls 
           preload='metadata'
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

