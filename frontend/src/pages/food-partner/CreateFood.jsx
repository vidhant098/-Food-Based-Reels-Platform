import React, {  useEffect, useState } from 'react';
import './CreateFood.css';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
const CreateFood = () => {
  const [selectedVideo, setSelectedVideo] = useState(null);
  const [foodName, setFoodName] = useState('');
  const [description, setDescription] = useState('');
  const [previewUrl, setPreviewUrl] = useState('');
 



  useEffect(() => {
    if (!selectedVideo) {
      setPreviewUrl('');
      return undefined;
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

  
//   //   name: req.body.name,
//       description: req.body.description,
//       video: fileUploadResult.url,
//       foodPartnerId: req.foodPartner._id,
// //  


 
   


  const onsubmit=  async(e)=>{

    e.preventDefault() ;
  
    const formData = new FormData() ;

     formData.append('name', foodName) ;
     formData.append('description', description) ;
     formData.append('video', selectedVideo) ; 

 
      const navigate = useNavigate();

    const response =await  axios.post('http://localhost:3000/api/food', 
        formData,
         { withCredentials: true } )

      navigate('/food-partner/:id') ;


    console.log(response.data);
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
          <div className="create-food-highlights" aria-label="Food post tips">
           
          </div>
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
                onChange={(event) => setFoodName(event.target.value)}
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
                onChange={(event) => setDescription(event.target.value)}
              />
              <span className="field-helper">{description.length}/240 characters</span>
            </label>

            <button type="submit" className="create-food-button">
              Create Food Post
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
                <p>
                  {description ||
                    'Add a short and tempting description so customers know what makes this dish worth ordering.'}
                </p>
              </div>
            </div>
          </aside>
        </div>
      </div>
    </section>
  );
};

export default CreateFood;
