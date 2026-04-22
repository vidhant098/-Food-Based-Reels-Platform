const foodModel = require("../models/food.model")  ;
const LikeModel  = require("../models/likes.model");
 
 const storageService = require("../services/storage.service")  ;

  const    { v4:uuid} =require("uuid") ; 

  async function createFood(req, res) {
  try {
    if (!req.file) {
      return res.status(400).json({ message: "Video is required" });
    }

    const fileUploadResult = await storageService.uploadFile(
      req.file.buffer,
      uuid() + "_" + req.file.originalname
    );

    console.log("UPLOAD RESULT:", fileUploadResult);

    const foodItem = await foodModel.create({
      name: req.body.name,
      description: req.body.description,
      video: fileUploadResult.url,
      foodPartnerId: req.foodPartner._id,
    });

    return res.status(201).json({
      message: "Food created",
      food: foodItem,
    });

  } catch (err) {
    console.log("ERROR:", err);

    return res.status(500).json({
      message: "Something went wrong",
      error: err.message, // 👈 IMPORTANT
    });
  }
}


 async  function getFoodItems(req, res )
 {
  
   try{
  const fooditems = await foodModel.find({}) ;

    res.status(200).json({
    message:"Food items fetched successfully",
    foodItems: fooditems
  });


   }
   catch(err){
     res.send(500).json({
       message:"Something went wrong",
       error: err.message
     })
   }


 
 }

   async function likeFood(req, res) {

     

    
 try{ 
 
 

  const user = req.user  ; 

 const {foodId} = req.body ;
 
 const isAlreadyLiked = await LikeModel.findOne
 (
     {user:user._id 
    , food:foodId} 
  
  ) 

   if(isAlreadyLiked) 
    
    {
      await LikeModel.deleteOne(
        {
          user:user._id , 
           food:foodId 
        }
      )  

      return res.status(200).json({
         message:"Food unliked successfully"
     
    }   
  )
   } 
  
   const like = await LikeModel.create({
    user:user._id , 
    food:foodId 
   }) 

    res.status(201).json({
      message:"Food liked successfully" ,
      like:like
    }) 

 } 

  catch(err){
    res.status(500).json({
      message:"Something went wrong" + err.message,
      error: err.message
    })
  }

   }


 module.exports= {createFood, getFoodItems, likeFood}  
 

 

