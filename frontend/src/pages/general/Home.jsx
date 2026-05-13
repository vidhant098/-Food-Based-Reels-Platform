import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { API_BASE_URL } from '../../config/api';

import './Home.css';

import BottomNav from '../../components/BottomNav';
import CommentModal from '../../components/CommentModal';
import ReelVideo from '../../components/ReelVideo';

import { useBookmarks } from '../../hooks/useBookmarks';
import { useComments } from '../../hooks/useComments';

const Home = () => {

  const navigate = useNavigate();

  const [foods, setFoods] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isDark, setIsDark] = useState(false);

  const [likedIds, setLikedIds] = useState(new Set());

  const [activeIndex, setActiveIndex] = useState(0);

  const itemRefs = useRef([]);

  const { isSaved, handleSave } = useBookmarks();

  const {
    commentModalOpen,
    comments,
    commentLoading,
    commentText,
    setCommentText,
    openCommentModal,
    closeCommentModal,
    handleAddComment,
  } = useComments(setFoods);

  // FETCH FOODS
  useEffect(() => {

    const fetchFoods = async () => {

      try {

        const response = await axios.get(
          `${API_BASE_URL}/api/food`,
          {
            withCredentials: true,
          }
        );

        setFoods(response.data.foodItems || []);

      } catch (err) {

        console.log('API error:', err);

      } finally {

        setLoading(false);

      }

    };

    fetchFoods();

  }, []);

  // INTERSECTION OBSERVER
  useEffect(() => {

    const observer = new IntersectionObserver(

      (entries) => {

        entries.forEach((entry) => {

          if (entry.isIntersecting) {

            const index = Number(
              entry.target.getAttribute('data-index')
            );

            setActiveIndex(index);

          }

        });

      },

      {
        threshold: 0.7,
      }

    );

    itemRefs.current.forEach((el) => {

      if (el) {

        observer.observe(el);

      }

    });

    return () => observer.disconnect();

  }, [foods]);

  // THEME
  useEffect(() => {

    const saved = localStorage.getItem('theme');

    if (saved === 'dark') {

      setIsDark(true);

    }

  }, []);

  const toggleTheme = () => {

    const newDark = !isDark;

    setIsDark(newDark);

    localStorage.setItem(
      'theme',
      newDark ? 'dark' : 'light'
    );

  };

  // LIKE
  const handleLike = async (foodId) => {

    const currentlyLiked = likedIds.has(foodId);

    try {

      await axios.post(
        `${API_BASE_URL}/api/food/like`,
        { foodId },
        { withCredentials: true }
      );

      setLikedIds((prev) => {

        const next = new Set(prev);

        if (next.has(foodId)) {

          next.delete(foodId);

        } else {

          next.add(foodId);

        }

        return next;

      });

      setFoods((prev) =>
        prev.map((f) =>
          f._id === foodId
            ? {
                ...f,
                likeCount:
                  (f.likeCount || 0) +
                  (currentlyLiked ? -1 : 1),
              }
            : f
        )
      );

    } catch (err) {

      if (err.response?.status === 401) {

        alert('Please login first to like foods');

        navigate('/user/login');

        return;

      }

      console.error('Like error', err);

    }

  };

  // VISIT PROFILE
  const visitProfile = (partnerId) => {

    if (partnerId) {

      navigate(`/food-partner/${partnerId}`);

    }

  };

  // LOADING
  if (loading) {

    return (
      <div
        className={`loading-screen ${
          isDark ? 'dark' : ''
        }`}
      >
        Loading reels...
      </div>
    );

  }

  return (

    <div className={`reel-container ${isDark ? 'dark' : ''}`}>

      <button
        className="theme-toggle"
        onClick={toggleTheme}
      >
        {isDark ? '☀️' : '🌙'}
      </button>

      {foods.map((food, index) => (

        <section
          key={food._id}
          className="reel-item"
          ref={(el) => (itemRefs.current[index] = el)}
          data-index={index}
        >

          <ReelVideo
            url={food.video}
            isActive={activeIndex === index}
            shouldLoad={Math.abs(activeIndex - index) <= 1}
          />

          <div className="reel-overlay">

            <div className="reel-info">

              <div className="food-meta-row">
                <h3 className="food-name">
                  {food.name}
                </h3>

                {food.price && (
                  <span className="food-price">
                    Rs {food.price}
                  </span>
                )}
              </div>

              <p className="food-desc">
                {food.description}
              </p>

              <p className="food-creator">

                {food.foodPartnerId ? (
                  <>

                    <span className="creator-label">
                      By
                    </span>

                    <span
                      className="creator-name clickable"
                      onClick={() =>
                        visitProfile(
                          food.foodPartnerId._id
                        )
                      }
                    >
                      {food.foodPartnerId.businessName ||
                        food.foodPartnerId.ownerName}
                    </span>

                    <button
                      className="visit-btn"
                      onClick={() =>
                        visitProfile(
                          food.foodPartnerId._id
                        )
                      }
                    >
                      Visit Profile
                    </button>

                  </>
                ) : (

                  <span>Unknown Creator</span>

                )}

              </p>

            </div>

            <div className="reel-actions">

              {/* LIKE BUTTON */}
              <button
                className="action-btn"
                onClick={() => handleLike(food._id)}
              >

                <svg
                  viewBox="0 0 24 24"
                  width="28"
                  height="28"
                  fill={
                    likedIds.has(food._id)
                      ? '#ff6b6b'
                      : 'none'
                  }
                  stroke="white"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M20.84 4.61a5.5 5.5 0 00-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 00-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 000-7.78z" />
                </svg>

                <span>
                  {food.likeCount || 0}
                </span>

              </button>

              {/* COMMENT BUTTON */}
              <button
                className="action-btn"
                onClick={() =>
                  openCommentModal(food._id)
                }
              >

                <svg
                  viewBox="0 0 24 24"
                  width="28"
                  height="28"
                  fill="none"
                  stroke="white"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M21 11.5a8.38 8.38 0 01-.9 3.8 8.5 8.5 0 01-7.6 4.7 8.38 8.38 0 01-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 01-.9-3.8 8.5 8.5 0 014.7-7.6 8.38 8.38 0 013.8-.9h.5a8.48 8.48 0 018 8v.5z" />
                </svg>

                <span>
                  {food.commentCount || 0}
                </span>

              </button>

              {/* SAVE BUTTON */}
              <button
                className="action-btn"
                onClick={() =>
                  handleSave(food._id)
                }
              >

                <svg
                  viewBox="0 0 24 24"
                  width="28"
                  height="28"
                  fill={
                    isSaved(food._id)
                      ? 'white'
                      : 'none'
                  }
                  stroke="white"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M19 21l-7-5-7 5V5a2 2 0 012-2h10a2 2 0 012 2z" />
                </svg>

                <span>
                  {isSaved(food._id)
                    ? 'Saved'
                    : 'Save'}
                </span>

              </button>

              {/* SHARE BUTTON */}
              <button className="action-btn">

                <svg
                  viewBox="0 0 24 24"
                  width="28"
                  height="28"
                  fill="none"
                  stroke="white"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <circle cx="18" cy="5" r="3" />
                  <circle cx="6" cy="12" r="3" />
                  <circle cx="18" cy="19" r="3" />
                  <line x1="8.59" y1="13.51" x2="15.42" y2="17.49" />
                  <line x1="15.41" y1="6.51" x2="8.59" y2="10.49" />
                </svg>

                <span>Share</span>

              </button>

            </div>

          </div>

        </section>

      ))}

      <CommentModal
        isOpen={commentModalOpen}
        onClose={closeCommentModal}
        comments={comments}
        commentLoading={commentLoading}
        commentText={commentText}
        setCommentText={setCommentText}
        onAddComment={handleAddComment}
      />

      <BottomNav isDark={isDark} />

    </div>

  );

};

export default Home;
