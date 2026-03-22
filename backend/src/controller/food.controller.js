const foodModel = require("../models/food.model")  ;


async function createFood(req, res)
{

    console.log(req.foodPartner)  /// it contains all the info about the food partner who is logged in by the request
  res.status(200).json({message:"create food item "})
  
   console.log(req.body)
   console.log(req.file)  /// it contains the info about the video file which is uploaded by the food partner while creating the food item
} 

 module.exports= {createFood}