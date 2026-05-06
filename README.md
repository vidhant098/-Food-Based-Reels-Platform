
# 🍔 Food Reels Platform

A full-stack reels-style web application where users can explore short food videos and interact through likes, comments, and saves, while food partners can upload and manage their content.

---

## 🚀 Features

* 🎬 Reels-style video feed with autoplay
* ❤️ Like / Unlike functionality
* 💬 Comment system with modal interface
* 🔖 Save / Bookmark feature
* 📤 Video upload with live preview
* 🔐 Authentication & protected routes
* ⚡ Optimistic UI updates for better user experience

---

## 👤 Role-Based Profile System

* Users can log in and view their personal profile
* When accessing the **“Add Food”** feature:

  * Non-registered users are redirected to food partner registration
  * Registered food partners are redirected to their profile
* Food partners can view and manage their uploaded food content

---

## 🛠️ Tech Stack

### Frontend

* React.js
* Axios
* CSS

### Backend

* Node.js
* Express.js
* MongoDB (Mongoose)

### Tools & Services

* Multer (file upload handling)
* ImageKit (media storage & CDN)

---

## 📂 Project Structure

### Backend

```
backend/
│
├── src/
│   ├── controller/
│   ├── models/
│   ├── routes/
│   ├── middlewares/
│   ├── services/
│   └── db/
│
├── app.js
├── server.js
└── .env
```

### Frontend

```
frontend/
│
├── src/
│   ├── pages/
│   ├── components/
│   ├── hooks/
│   └── App.jsx
```

---

## ⚙️ Key Functionalities

### Authentication

* Secure login system
* Cookie-based authentication
* Protected routes for actions like like, comment, and upload

### Video Upload

* Upload handled using Multer
* Stored via ImageKit CDN
* Live preview before upload

### Feed System

* Auto-playing video reels
* Dynamic data rendering using APIs
* Smooth scrolling experience

### Engagement Features

* Like / Unlike system
* Comment functionality
* Save / Bookmark posts

---

## ⚡ Performance Optimizations

* Implemented **pagination** to reduce data load
* Applied **query optimization** (limit, select, indexing)
* Reduced response size for faster API performance
* Used optimistic UI updates for better responsiveness

---

## 🔌 API Endpoints (Sample)

```
GET    /api/food
POST   /api/food
POST   /api/food/like
GET    /api/food-partner/:id
GET    /api/auth/me
```

---

## 📦 Installation

### Clone the repository

```
git clone https://github.com/your-username/your-repo.git
```

### Install dependencies

Frontend:

```
cd frontend
npm install
npm run dev
```

Backend:

```
cd backend
npm install
npm start
```

---

## 🔒 Environment Variables

Create a `.env` file in backend:

```
PORT= local host Port_number
MONGO_URI=My_mongodb_url
JWT_SECRET=My_secret

IMAGEKIT_PUBLIC_KEY=My_key
IMAGEKIT_PRIVATE_KEY=My_key
IMAGEKIT_URL_ENDPOINT=My_url
```

---

## 🧠 Learnings

* Built a scalable full-stack application using MVC architecture
* Implemented file upload and CDN-based media handling
* Applied database query optimization techniques
* Designed role-based user flow for better UX

---

## 📌 Future Improvements 

* Add Redis caching for faster API responses
* Implement load balancing for scalability
* Improve UI animations and transitions
* Add notification system

---

## ⭐ Support

If you like this project, consider giving it a ⭐ on GitHub!
