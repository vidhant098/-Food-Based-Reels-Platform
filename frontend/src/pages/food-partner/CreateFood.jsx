import React, { useEffect, useState } from 'react';
import './CreateFood.css';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { API_BASE_URL } from '../../config/api';

const CreateFood = () => {

  const navigate = useNavigate(); // ✅ FIX

  const [selectedVideo, setSelectedVideo] = useState(null);
  const [foodName, setFoodName] = useState('');
  const [description, setDescription] = useState('');
  const [price, setPrice] = useState('');
  const [previewUrl, setPreviewUrl] = useState(''); 
  const [showSuccess, setShowSuccess] = useState(false); // ✅ NEW
  const [loading, setLoading] = useState(false); // ✅ NEW 

  useEffect(() => {
    if (!selectedVideo) {
      setPreviewUrl('');
      return;
    }

    const objectUrl = URL.createObjectURL(selectedVideo);
    setPreviewUrl(objectUrl);

    return () => {
      URL.revokeObjectURL(objectUrl);
    };
  }, [selectedVideo]);

  const handleVideoChange = (event) => {
    const file = event.target.files?.[0] ?? null;
    setSelectedVideo(file);
  };

  const onsubmit = async (e) => {
    e.preventDefault();

    if (!foodName || !description || !price || !selectedVideo) {
      alert("Please fill all fields");
      return;
    }

    const formData = new FormData();
    formData.append('name', foodName);
    formData.append('description', description);
    formData.append('video', selectedVideo);
    formData.append('price', price ) ; 

    try {
      setLoading(true);

      const response = await axios.post(
        `${API_BASE_URL}/api/food`,
        formData,
        { withCredentials: true }
      );

      console.log(response.data);

      setShowSuccess(true); // ✅ popup show
      const foodPartnerId = response.data?.food?.foodPartnerId;

      // reset form
      setFoodName('');
      setDescription('');
      setPrice('');
      setSelectedVideo(null);

      // redirect after 2 sec
setTimeout(() => {
        navigate('/foodPartnerOwn/profile');
      }, 2000);

    } catch (err) {

      if (err.response?.status === 401) { 
        alert("Login as Food Partner")
        navigate('/food-partner/login');
        return;
      } 
        
      navigate('/foodPartnerOwn/profile')

      console.error("Upload error:", err);

    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="create-food-page">
      <div className="create-food-shell"> 

        <div className="create-food-hero">
          <span className="create-food-badge">Food Partner Studio</span>
          <h1>Show your next signature dish</h1>
          <p>
            Upload a short food video, add a memorable name, and describe what
            makes it special. 
          </p>
        </div>

        <div className="create-food-layout"> 

          <form className="create-food-form" onSubmit={onsubmit}>

            <label className="create-food-field create-food-upload" htmlFor="food-video">
              <span className="field-label">Food Video</span> 

              <div className="upload-box"> 

                <span className="upload-title">Tap to choose a video</span>

                <span className="upload-copy">
                  MP4, MOV, or WebM clips work best for food reels.
                </span>
                <span className="upload-meta"> 
                  {selectedVideo ? selectedVideo.name : 'No video selected yet'}
                </span>  
              </div>

              <input
                id="food-video"
                type="file"
                accept="video/*"
                onChange={handleVideoChange}
              />
            </label>

            <label className="create-food-field" htmlFor="food-name"> 
              <span className="field-label">Food Name</span>
              <input
                id="food-name"
                type="text"
                placeholder="Example: Smoky Tandoori Burger"
                value={foodName}
                onChange={(e) => setFoodName(e.target.value)}
              />
            </label> 

            <label className="create-food-field" htmlFor="food-price">
              <span className="field-label">Price</span>
              <input
                id="food-price"
                type="number"
                min="0"
                step="1"
                inputMode="numeric"
                placeholder="Example: 149"
                value={price}
                onChange={(e) => setPrice(e.target.value)}
                required
              />
            </label>

            <label className="create-food-field" htmlFor="food-description">
              <span className="field-label">Description</span>
              <textarea
                id="food-description"
                rows="5"
                maxLength="240"
                placeholder="Tell customers about the taste, texture, spice level, or why they should try it."
                value={description}
                onChange={(e) => setDescription(e.target.value)}
              />
              <span className="field-helper">{description.length}/240 characters</span>
            </label>

            <button type="submit" className="create-food-button" disabled={loading}>
              {loading ? "Uploading..." : "Create Food Post"}
            </button>

          </form>

          <aside className="create-food-preview">
            <div className="preview-card">
              <span className="preview-label">Live Preview</span>

              <div className="preview-media">
                {previewUrl ? (
                  <video
                    className="preview-video"
                    src={previewUrl}
                    controls
                    muted
                    playsInline
                  />
                ) : (
                  <div className="preview-placeholder">
                    Video preview will appear here
                  </div>
                )}
              </div>

              <div className="preview-content">
                <h2>{foodName || 'Your food name'}</h2>
                <span className="preview-price">{price ? `₹${price}` : 'Set your price'}</span>
                <p>
                  {description ||
                    'Add a short and tempting description so customers know what makes this dish worth ordering.'}
                </p>
              </div>
            </div>
          </aside>
        </div>

        {/* ✅ SUCCESS POPUP (NO CSS CHANGE) */}
        {showSuccess && (
          <div className="success-popup">
            <h2>🎉 Success!</h2>
            <p>Your food has been uploaded</p> 

          </div>
        )}

      </div>
    </section>
  );
};

export default CreateFood;
