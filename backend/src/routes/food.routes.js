const express = require('express');
const router = express.Router();

const multer = require('multer');

const foodController = require('../controller/food.controller');

const authMiddleware = require('../middlewares/auth.middleware');

const upload = multer({ storage: multer.memoryStorage() });

// POST /api/food/ - protected - create food item
router.post(
  '/',
  authMiddleware.authFoodPartnerMiddleware,
  upload.single('video'),
  foodController.createFood
);

// GET /api/food/ - protected - get all food items
// router.get(
//   "/",
//   authMiddleware.authUserMiddleware,
//   foodController.getFoodItems
// ); 


router.get(
  "/",
  foodController.getFoodItems
);

// POST /api/food/like - protected - like/unlike food
router.post(
  '/like',
  authMiddleware.authUserMiddleware,
  foodController.likeFood
);

// POST /api/food/save - protected - save/unsave food
router.post(
  '/save',
  authMiddleware.authUserMiddleware,
  foodController.saveFood
);

// GET /api/food/saved - protected - get saved foods for logged-in user
router.get(
  '/saved',
  authMiddleware.authUserMiddleware,
  foodController.getSavedFoods
);

// POST /api/food/comment - protected - add comment
router.post(
  '/comment',
  authMiddleware.authUserMiddleware,
  foodController.addComment
);

// GET /api/food/comment/:foodId - protected - get comments for a food
router.get(
  '/comment/:foodId',
  authMiddleware.authUserMiddleware,
  foodController.getComments
);  
  

module.exports = router;
