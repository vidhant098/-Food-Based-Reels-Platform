

 const express = require('express');
 const router = express.Router();
  const authMiddleware = require('../middlewares/auth.middleware');  

 const orderController = require('../controller/order.controller')

router.post('/placeOrder', authMiddleware.authUserMiddleware, orderController.placeOrder);  

 router.get('/myOrders', authMiddleware.authUserMiddleware, orderController.myOrders);


     router.get( '/foodPartnerOrders',  authMiddleware.authFoodPartnerMiddleware, orderController.getPartnerOrders);
 
   module.exports = router;
