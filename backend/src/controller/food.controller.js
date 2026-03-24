const foodModel = require("../models/food.model")  ;
 
 const storageService = require("../services/storage.service")  ;

  const    { v4:uuid} =require("uuid") ; 

  async function createFood(req, res)
    {

     console.log(req.foodPartner)  
    
   
   console.log(req.body)
   console.log(req.file)

   const   fileUploadResult = await storageService.uploadFile(req.file.buffer , uuid());
 
  //   console.log("full result:" ,fileUploadResult)
  //   console.log(fileUploadResult.url)
  //  console.log(JSON.stringify(obj, null, 2));
  //   console.log(resullt)  
    
   const foodItem = await foodModel.create({
    name:req.body.name , 
    description:req.body.description,
    video:fileUploadResult.url ,
    foodPartnerId:req.foodPartner._id
   })



 res.status(200).json(
  {message:"create food item ",
   food :foodItem
 })
      
  }  

 module.exports= {createFood}  


