const  express = require('express');
 const router = express.Router() ; 
 
 const multer = require('multer')

const foodController = require('../controller/food.controller')

const authMiddleware = require('../middlewares/auth.middleware')
  
 const upload = multer({storage: multer.memoryStorage()},)


//  post/api/food/ protected/ create food item

  router.post('/'  , authMiddleware.authFoodPartnerMiddleware    ,upload.single("video"),  foodController.createFood)
  
 module.exports = router ;