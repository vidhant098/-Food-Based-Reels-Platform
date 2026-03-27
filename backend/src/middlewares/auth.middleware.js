
// const foodPartnerModel = require('../models/foodpartner.model') ;

//  const jwt = require('jsonwebtoken')


//  async function  authFoodPartnerMiddleware    (req , res , next )
//   {
//     const token = req.cookies.token;

//      if(!token)
//      {
//          return   res.status(401).json({message:'unauthorized  please login first '})
//      }

//       try{  
//            const decoded = jwt.verify(token , process.env.JWT_SECRET) 

//            const foodPartner =   await    foodPartnerModel.findById(decoded.id)  

//            req.foodPartner = foodPartner ;   /// it contains all  the info about the food partner who is logged in by thr request
//             next() ; 

//       } 
//       catch(err)
//       { 
         
//        res.status(401).json({message:"Invalid token "})
//       }
//     }

//   module.exports= { authFoodPartnerMiddleware }

  

// const foodPartnerModel = require('../models/foodpartner.model');
// const jwt = require('jsonwebtoken');

// async function authFoodPartnerMiddleware(req, res, next) {

//   const authHeader = req.headers.authorization;

//   if (!authHeader) {
//     return res.status(401).json({ message: "No token provided" });
//   }

//   const token = authHeader.split(" ")[1];

//   try {
//     const decoded = jwt.verify(token, process.env.JWT_SECRET);

//     const foodPartner = await foodPartnerModel.findById(decoded.id);

//     req.foodPartner = foodPartner;

//     next();

//   } catch (err) {
//     return  res.status(401).json({ message: "Invalid token" });
//   }
// }

// module.exports = { authFoodPartnerMiddleware };
   

// async function authFoodPartnerMiddleware(req, res, next) {

//     let token;

//     // ✅ Check header first
//     if (req.headers.authorization && req.headers.authorization.startsWith("Bearer")) {
//         token = req.headers.authorization.split(" ")[1];
//     }

//     // ✅ Fallback to cookies (optional)
//     else if (req.cookies.token) {
//         token = req.cookies.token;
//     }

//     if (!token) {
//         return res.status(401).json({
//             message: "No token provided"
//         });
//     }

//     try {
//         const decoded = jwt.verify(token, process.env.JWT_SECRET);

//         const foodPartner = await foodPartnerModel.findById(decoded.id);

//         if (!foodPartner) {
//             return res.status(404).json({
//                 message: "Food partner not found"
//             });
//         }

//         req.foodPartner = foodPartner;

//         next();

//     } catch (err) {
//         return res.status(401).json({
//             message: "Invalid token"
//         });
//     }
// } 



const foodPartnerModel = require("../models/foodpartner.model");
const jwt = require("jsonwebtoken");

async function authFoodPartnerMiddleware(req, res, next) {
    try {
        let token;

        // ✅ 1. Check Authorization Header (Postman)
        if (
            req.headers.authorization &&
            req.headers.authorization.startsWith("Bearer")
        ) {
            token = req.headers.authorization.split(" ")[1];
        }

        // ✅ 2. Optional: Check Cookies
        else if (req.cookies && req.cookies.token) {
            token = req.cookies.token;
        }

        // ❌ If no token
        if (!token) {
            return res.status(401).json({
                message: "No token provided"
            });
        }

        // ✅ Verify Token
        const decoded = jwt.verify(token, process.env.JWT_SECRET);

        // ✅ Find Food Partner
        const foodPartner = await foodPartnerModel.findById(decoded.id);

        if (!foodPartner) {
            return res.status(404).json({
                message: "Food partner not found"
            });
        }

        // ✅ Attach to request
        req.foodPartner = foodPartner;

        next();

    } catch (err) {
        return res.status(401).json({
            message: "Invalid token"
        });
    }
}

module.exports = { authFoodPartnerMiddleware };