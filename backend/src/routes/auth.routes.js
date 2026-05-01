const express  = require('express') 
 const router  = express.Router() ; 
const authController = require('../controller/auth.controller')  

const authMiddleware = require('../middlewares/auth.middleware');

router.post('/user/register' ,authController.registerUser   )

router.post('/user/login' ,authController.loginUser   )

router.post('/user/logout' , authController.logoutUser)

router.post('/foodpartner/register' , authController.registerFoodPartner)

router.post('/foodpartner/login' , authController.loginFoodpartner  )

router.post('/foodpartner/logout' , authController.logoutFoodPartner)



router.get('/me'  ,  authMiddleware.authUserMiddleware  , authController.getCurrentUser)

module.exports= router ;