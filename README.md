# Food Reels Full Stack App

A full-stack food discovery platform with short reel-style videos. Users can watch food reels, like, comment, save videos, and manage their profile. Food partners can register, log in, upload food videos, and view their own mobile-first dashboard.

## Features

### User Features

- User registration and login with cookie-based authentication.
- Reels-style home feed with vertical scroll snap.
- Lazy video loading for better mobile performance.
- Like and unlike food videos (likeCount updates per user toggle).

- Comment modal for each food video.
- Save and unsave food videos.
- User profile dashboard with:
  - liked videos
  - saved videos
  - video grid
  - active logout button with loading/error feedback
- Saved videos page.
- Visit food partner profile from a reel.

### Food Partner Features

- Food partner registration and login.
- Authenticated redirect to the partner's own profile dashboard after login.
- Create food video posts with name, description, price, and uploaded video.
- Food partner dashboard with:
  - business details
  - performance stats
  - profile strength
  - spotlight food
  - quick actions
  - Instagram-style 3-column food reel grid
- Public food partner profile page with uploaded food videos.

### Performance and UX

- Home feed only loads the current, previous, and next videos.
- Non-nearby reels render lightweight placeholders.
- Active reel preloads with `auto`; nearby reels use `metadata`.
- Partner profile grid avoids autoplaying all videos at once.
- Mobile-first layouts for home feed, user profile, and food partner profile.
- Transparent reel caption overlay with readable text and colorful price badge.

## Tech Stack

### Frontend

- React
- React Router DOM
- Axios
- Vite
- CSS
- Tailwind utilities are available in the project

### Backend

- Node.js
- Express
- MongoDB
- Mongoose
- JWT
- Cookie Parser
- CORS
- Multer
- ImageKit

## Project Structure

```text
zomatofullstack/
  backend/
    src/
      controller/
      db/
      middlewares/
      models/
      routes/
      services/
    server.js
    package.json

  frontend/
    src/
      components/
      hooks/
      pages/
      routes/
      styles/
    package.json
```

## Requirements

- Node.js
- npm
- MongoDB database URL
- ImageKit account for video storage
- Modern browser with video support

## Environment Variables

Create `backend/.env`:

```env
PORT=3000
MONGODB_URL=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret

IMAGEKIT_PUBLIC_KEY=your_imagekit_public_key
IMAGEKIT_PRIVATE_KEY=your_imagekit_private_key
IMAGEKIT_URL_ENDPOINT=your_imagekit_url_endpoint
```

Important: the backend uses `MONGODB_URL`, not `MONGO_URI`.

## Installation

Install backend dependencies:

```bash
cd backend
npm install
```

Install frontend dependencies:

```bash
cd frontend
npm install
```

## Running Locally

Start the backend:

```bash
cd backend
npm start
```

By default the backend runs on:

```text
http://localhost:3000
```

Start the frontend:

```bash
cd frontend
npm run dev
```

Vite will print the frontend URL in the terminal, commonly:

```text
http://localhost:5173
```

## Build

Build the frontend:

```bash
cd frontend
npm run build
```

Lint the frontend:

```bash
cd frontend
npm run lint
```

Note: lint may fail if existing unrelated unused-variable issues are present.

## Frontend Routes

```text
/                         Home reels feed
/saved                    Saved videos page
/user/register            User registration
/user/login               User login
/user/profile             User profile dashboard
/user/logout              Logout confirmation page
/food-partner/register    Food partner registration
/food-partner/login       Food partner login
/foodPartnerOwn/profile   Logged-in food partner dashboard
/food-partner/:id         Public food partner profile
/create-food              Create/upload food video
```

## Backend API Routes

### Auth

```text
POST /api/auth/user/register
POST /api/auth/user/login
POST /api/auth/user/logout
GET  /api/auth/me

POST /api/auth/foodpartner/register
POST /api/auth/foodpartner/login
POST /api/auth/foodpartner/logout
```

### Food

```text
GET  /api/food
POST /api/food
POST /api/food/like
POST /api/food/save
GET  /api/food/saved
GET  /api/food/liked
POST /api/food/comment
GET  /api/food/comment/:foodId
```

### Food Partner

```text
GET /api/food-partner/profile
GET /api/food-partner/:id
```

## Data Models

### User

- fullName
- email
- password

### Food Partner

- ownerName
- businessName
- email
- password
- phone
- address

### Food

- video
- name
- description
- price
- foodPartnerId
- likeCount
- commentCount

### Like

- user
- food

### Save

- user
- food

### Comment

- user
- food
- text

## Notes for Developers

- Authentication is cookie-based. Axios calls that need auth use `withCredentials: true`.
- Food partner and user auth both use the `token` cookie.
- Food upload uses Multer memory storage and ImageKit upload.
- The app currently uses hardcoded API URLs such as `http://localhost:3000`.
- If videos do not load quickly on mobile, compress uploads before storage or generate lower-resolution video variants.

## Troubleshooting

### ImageKit error on backend start

If you see an ImageKit public/private key error, check `backend/.env`:

```env
IMAGEKIT_PUBLIC_KEY=...
IMAGEKIT_PRIVATE_KEY=...
IMAGEKIT_URL_ENDPOINT=...
```

### MongoDB connection error

Check that `MONGODB_URL` is set and the database is reachable.

### Logout does not work

The user logout endpoint is:

```text
POST /api/auth/user/logout
```

Food partner logout endpoint is:

```text
POST /api/auth/foodpartner/logout
```

### Liked videos do not show

Make sure the backend includes:

```text
GET /api/food/liked
```

and that the user has liked at least one food video.

## Future Improvements

- Move API base URL to a frontend environment variable.
- Add backend pagination for the home feed.
- Generate thumbnail images for video grids.
- Generate mobile-optimized video versions.
- Add edit/delete for partner food videos.
- Add profile editing.
- Add stronger route protection on the frontend.
