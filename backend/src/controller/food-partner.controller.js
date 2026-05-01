const mongoose  = require('mongoose')  

const foodPartnerModel = require('../models/foodpartner.model')  
const foodModel = require('../models/food.model')
 
 async  function getFoodPartnerById(req , res)
    { 


        try{
             const foodPartnerId = req.params.id ;
             const foodPartner = await foodPartnerModel.findById(foodPartnerId)
    // res.status(200).json(foodPartner) 


     if(!foodPartner)
        {
            return res.status(404).json({message : "Food Partner not found"})  ; 

        } 

        const foods = await foodModel.find({ foodPartnerId: foodPartnerId });

        res.status(200).json 
        ( 
             {message : "Food Partner found" , foodPartner, foods}
        )
        } 

        catch(err)
        {
            console.log(err)
            res.status(500).json({message :  err.message})
        }
    }
  

    module.exports = {getFoodPartnerById}
