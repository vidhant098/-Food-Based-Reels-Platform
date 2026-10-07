import React, { useEffect, useRef, useState } from 'react';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';
import { API_BASE_URL } from '../../config/api';
import OrderBox from '../../components/OrderBox';
import ActionButtons from '../../components/ActionButtons';
import BottomNav from '../../components/BottomNav';
import CommentModal from '../../components/CommentModal';
import ReelVideo from '../../components/ReelVideo';
import { useBookmarks } from '../../hooks/useBookmarks';
import { useComments } from '../../hooks/useComments';
import './Home.css';
import './Order.css';
import './Filter.css';

const Home = () => {
  const navigate = useNavigate();
  const itemRefs = useRef([]);

  const [foods, setFoods] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isDark, setIsDark] = useState(false);
  const [likedIds, setLikedIds] = useState(new Set());
  const [pendingLikes, setPendingLikes] = useState(new Set());
  const [activeIndex, setActiveIndex] = useState(0);
  const [sortBy, setSortBy] = useState('default');

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

  useEffect(() => {
    const fetchFoods = async () => {
      try {
        const response = await axios.get(`${API_BASE_URL}/api/food`, {
          withCredentials: true,
        });

        const foodItems = response.data.foodItems || [];
        const liked = new Set();

        foodItems.forEach((food) => {
          if (food.isLiked) liked.add(food._id);
        });

        setFoods(foodItems);
        setLikedIds(liked);
      } catch (err) {
        console.log('API error:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchFoods();
  }, []);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveIndex(Number(entry.target.getAttribute('data-index')));
          }
        });
      },
      { threshold: 0.7 }
    );

    itemRefs.current.forEach((el) => {
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, [foods]);

  useEffect(() => {
    setIsDark(localStorage.getItem('theme') === 'dark');
  }, []);

  const toggleTheme = () => {
    const nextDark = !isDark;
    setIsDark(nextDark);
    localStorage.setItem('theme', nextDark ? 'dark' : 'light');
  };

  const handleLike = async (foodId) => {
    if (pendingLikes.has(foodId)) return;

    const alreadyLiked = likedIds.has(foodId);

    setPendingLikes((prev) => new Set(prev).add(foodId));
    setLikedIds((prev) => {
      const next = new Set(prev);
      if (alreadyLiked) next.delete(foodId);
      else next.add(foodId);
      return next;
    });
    setFoods((prev) =>
      prev.map((food) =>
        food._id === foodId
          ? {
              ...food,
              likeCount: alreadyLiked
                ? Math.max(0, (food.likeCount || 0) - 1)
                : (food.likeCount || 0) + 1,
            }
          : food
      )
    );

    try {
      await axios.post(
        `${API_BASE_URL}/api/food/like`,
        { foodId },
        { withCredentials: true }
      );
    } catch (err) {
      console.error('Like error:', err.message);

      setLikedIds((prev) => {
        const next = new Set(prev);
        if (alreadyLiked) next.add(foodId);
        else next.delete(foodId);
        return next;
      });
      setFoods((prev) =>
        prev.map((food) =>
          food._id === foodId
            ? {
                ...food,
                likeCount: alreadyLiked
                  ? (food.likeCount || 0) + 1
                  : Math.max(0, (food.likeCount || 0) - 1),
              }
            : food
        )
      );

      if (err.response?.status === 401) {
        toast.error('Please login first');
        
      }
    } finally {
      setPendingLikes((prev) => {
        const next = new Set(prev);
        next.delete(foodId);
        return next;
      });
    }
  };

  const visitProfile = (partnerId) => {
    if (partnerId) navigate(`/food-partner/${partnerId}`);
  };

  const visibleFoods = [...foods];

  if (sortBy === 'lowToHigh') {
    visibleFoods.sort((a, b) => (a.price || 0) - (b.price || 0));
  }

  if (sortBy === 'highToLow') {
    visibleFoods.sort((a, b) => (b.price || 0) - (a.price || 0));
  }

  if (loading) {
    return (
      <div className={`loading-screen ${isDark ? 'dark' : ''}`}>
        Loading reels...
      </div>
    );
  }

  return (
    <div className={`reel-container ${isDark ? 'dark' : ''}`}>
      <div className="home-topbar">
        <Link className="login-link" to="/user/login">
          Login
        </Link>

        <select
          className="sort-select"
          value={sortBy}
          onChange={(event) => setSortBy(event.target.value)}
          aria-label="Sort foods"
        >
          <option value="default">Default</option>
          <option value="lowToHigh">Price: Low to High</option>
          <option value="highToLow">Price: High to Low</option>
        </select>

        <button
          className="theme-toggle"
          type="button"
          onClick={toggleTheme}
          aria-label="Toggle theme"
        >
          {isDark ? '🌚' : '☀️'}
        </button>
      </div>

      {visibleFoods.map((food, index) => (
        <section
          key={food._id}
          className="reel-item"
          ref={(el) => {
            itemRefs.current[index] = el;
          }}
          data-index={index}
        >
          <ReelVideo
            url={food.video}
            isActive={activeIndex === index}
            shouldLoad={Math.abs(activeIndex - index) <= 1}
          />

          <div className="reel-overlay">
            <div className="reel-overlay-left">
              <div className="reel-info">
                <div className="food-meta-row">
                  <h3 className="food-name">{food.name}</h3>
                  {food.price && <span className="food-price">Rs {food.price}</span>}
                </div>

                <p className="food-desc">{food.description}</p>

                <p className="food-creator">
                  {food.foodPartnerId ? (
                    <>
                      <span className="creator-label">By</span>
                      <span
                        className="creator-name clickable"
                        onClick={() => visitProfile(food.foodPartnerId._id)}
                      >
                        {food.foodPartnerId.businessName ||
                          food.foodPartnerId.ownerName}
                      </span>
                      <button
                        className="visit-btn"
                        type="button"
                        onClick={() => visitProfile(food.foodPartnerId._id)}
                      >
                        Visit Profile
                      </button>
                    </>
                  ) : (
                    <span>Unknown Creator</span>
                  )}
                </p>
              </div>
            </div>

            {activeIndex === index && (
              <div
                className="order-box-wrapper"
                onClick={(event) => event.stopPropagation()}
              >
                <OrderBox food={food} />
              </div>
            )}
          </div>

          <ActionButtons
            food={food}
            likedIds={likedIds}
            handleLike={handleLike}
            isSaved={isSaved}
            handleSave={handleSave}
            openCommentModal={openCommentModal}
          />
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
