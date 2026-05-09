const express = require('express');
 
 const foodPartnerController = require('../controller/food-partner.controller') 

  authMiddlwere = require('../middlewares/auth.middleware') ;
    const router = express.Router() ;

    router.get('/profile' , 
         authMiddlwere.authFoodPartnerMiddleware, 
        foodPartnerController.foodPartnerProfile ) 


router.get("/:id" 
   , authMiddlwere.authUserMiddleware ,
    foodPartnerController.getFoodPartnerById ) 

      

   module.exports = router ;