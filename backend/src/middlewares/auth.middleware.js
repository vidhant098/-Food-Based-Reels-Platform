



const foodPartnerModel = require("../models/foodpartner.model");

const userModel = require("../models/user.model")
 
const jwt = require("jsonwebtoken");

async function authFoodPartnerMiddleware(req, res, next) {
    try {
        let token;

         if (
            req.headers.authorization &&
            req.headers.authorization.startsWith("Bearer")
        ) {
            token = req.headers.authorization.split(" ")[1];
        }

    
        else if (req.cookies && req.cookies.token) {
            token = req.cookies.token;
        }

        
        if (!token) {
            return res.status(401).json({
                message: "No token provided"
            });
        }

        const decoded = jwt.verify(token, process.env.JWT_SECRET);

     
        const foodPartner = await foodPartnerModel.findById(decoded.id);

        if (!foodPartner) {
            return res.status(404).json({
                message: "Food partner not found"
            });
        }

        req.foodPartner = foodPartner;

        next();

    } catch (err) {
        return res.status(401).json({
            message: "Invalid token"
        });
    }
} 

 
const authUserMiddleware = async (req, res, next) => {
  try {
    // Accept token from cookie OR Authorization header
    const tokenFromCookie = req.cookies?.token;
    const authHeader = req.headers?.authorization;

    let token = tokenFromCookie;
    if (!token && authHeader && authHeader.startsWith('Bearer')) {
      token = authHeader.split(' ')[1];
    }

    if (!token) {
      return res.status(401).json({ message: "Unauthorized, please login first" });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    const user = await userModel.findById(decoded.id);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    req.user = user;
    next();
  } catch (err) {
    return res.status(401).json({ message: "Invalid token", error: err.message });
  }
};


module.exports = { authFoodPartnerMiddleware, authUserMiddleware };