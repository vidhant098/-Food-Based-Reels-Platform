
const foodPartnerModel = require('../models/foodpartner.model') ;

 const jwt = require('jsonwebtoken')


 async function  authFoodPartnerMiddleware    (req , res , next )
  {
    const token = req.cookies.token;

     if(!token)
     {
         return   res.status(401).json({message:'unauthorized  please login first '})
     }

      try{  
           const decoded = jwt.verify(token , process.env.JWT_SECRET) 

           const foodPartner =   await    foodPartnerModel.findById(decoded.id)  

           req.foodPartner = foodPartner ;   /// it contains all  the info about the food partner who is logged in by thr request
            next() ; 

      } 
      catch(err)
      { 
         
       res.status(401).json({message:"Invalid token "})
      }
    }

  module.exports= { authFoodPartnerMiddleware }