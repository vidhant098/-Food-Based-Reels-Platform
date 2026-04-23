const  express = require('express');
 const router = express.Router() ; 
 
 const multer = require('multer')

const foodController = require('../controller/food.controller')

const authMiddleware = require('../middlewares/auth.middleware')
   


 const upload = multer({storage: multer.memoryStorage()},)
 

//  post/api/food/ protected/ create food item

  // router.post('/'     ,upload.single('video'),  foodController.createFood) 
  router.post(
  '/',
  authMiddleware.authFoodPartnerMiddleware,
  upload.single('video'),
  foodController.createFood
);

//  api for normal users  we have created new middleware for normal usr  

 router.get("/" 
   ,authMiddleware.authUserMiddleware  
    , foodController.getFoodItems) 
  
 

  router.post('/like' 
    , authMiddleware.authUserMiddleware ,  
     foodController.likeFood)
 

 router.post( 'save' , authMiddleware.authUserMiddleware , foodController.saveFood)

 module.exports = router ; 




//  const file = req.file; // This is the actual file buffer
// await uploadFile(file.buffer, file.originalname);