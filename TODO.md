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

## Bug Fix Log

### Fixed: ERR_HTTP_HEADERS_SENT in Login APIs
**Date:** Fixed now  
**File:** `backend/src/controller/auth.controller.js`  
**Problem:** When login credentials were invalid (user not found or wrong password), the code sent a `400` error response but did **not** `return`. This caused execution to continue, and the function later tried to call `res.cookie()` and `res.status(200).json()` — attempting to send HTTP headers again after they were already sent, which crashed the server with `ERR_HTTP_HEADERS_SENT`.

**Where it happened:**
1. `loginUser` function — `if(!user)` block (line ~64)
2. `loginUser` function — `if(!isPasswordValid)` block (line ~70)
3. `loginFoodpartner` function — `if(!foodPartner)` block (line ~137)

**Fix:** Added `return` before all `res.status(400)...` calls so the function exits immediately after sending the error response. Also added missing `const` keyword to the `user` variable in `loginUser`.

**Before:**
```js
if(!user) {
   res.status(400).json({message: 'invalid email or password'})
}
// execution continues → crash
```

**After:**
```js
if(!user) {
   return res.status(400).json({message: 'invalid email or password'})
}
// function exits, no crash
```

