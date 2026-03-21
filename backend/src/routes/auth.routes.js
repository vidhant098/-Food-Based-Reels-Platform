const express  = require('express') 
 const router  = express.Router() ; 
const authController = require('../controller/auth.controller')  



router.post('/user/register' ,authController.registerUser   )

router.post('/user/login' ,authController.loginUser   )

router.post('/user/logout' , authController.logoutUser)

router.post('/foodpartner/register' , authController.registerFoodPartner)

router.post('/foodpartner/login' , authController.loginFoodpartner  )

router.post('/foodpartner/logout' , authController.logoutFoodPartner)

module.exports= router ;