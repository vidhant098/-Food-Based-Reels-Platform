# Implementation TODO - Instagram-Style Reels with Comments & Profile Visits

## Phase 1: Backend Changes
- [x] Create `backend/src/models/comment.model.js` - comment schema
- [x] Update `backend/src/models/food.model.js` - add commentCount field
- [x] Update `backend/src/controller/food.controller.js` - populate foodPartnerId, add comment controllers
- [x] Update `backend/src/routes/food.routes.js` - add comment routes
- [x] Update `backend/src/controller/food-partner.controller.js` - fetch partner's foods

## Phase 2: Frontend Changes
- [x] Update `frontend/src/pages/UserLogin.jsx` - redirect to home `/` after login
- [x] Update `frontend/src/pages/general/Home.jsx` - comments modal, profile navigation, real counts
- [x] Update `frontend/src/pages/general/Home.css` - comment modal styles
- [x] Update `frontend/src/pages/food-partner/Profile.jsx` - fetch and display partner's videos

## Phase 3: Testing
- [ ] Restart backend server
- [ ] Test login -> home -> reels flow
- [ ] Test like, comment, save functionality
- [ ] Test visit profile navigation

