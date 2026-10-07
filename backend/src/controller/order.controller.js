  const foodModel = require('../models/food.model')
const orderModel  = require('../models/order.model')


 async function  placeOrder(req, res) {


     try{ 
        const{foodId , quantity} = req.body

              const userId = req.user._id; 
              if(!foodId)
              {
                 return res.status(400).json({
                   message:  "Food ID is required" 
                 })
              }

              const orderQuantity = Number(quantity);
              if(!Number.isFinite(orderQuantity) || orderQuantity <=0)
              {
                 return res.status(400).json({
                   message:  "invalid quantity" 
                 })
              }

             const food = await foodModel.findById(foodId)  ; 
           if(!food)
           {
            return res.status(404).json({ message: "Food not found" });
           } 

             const TotalPrice = Number(food.price)*orderQuantity 

             const order = await orderModel.create({

                userId:userId ,
                foodId:foodId,
                foodPartnerId:food.foodPartnerId ,
                quantity:orderQuantity ,
                totalPrice:TotalPrice   

             });

           res.status(201).json({

            message: "Order placed successfully",

            order

        });



     }
   catch(err) {

        console.log(err);

        res.status(500).json({

            message: err.message

        });

    }

}




    async  function   myOrders( req , res)
   {
    try{ 
       
          const userId = req.user._id

          const orders = await orderModel.find({userId: userId})
         .populate('foodId')
         .populate('foodPartnerId')
         
          res.status(202).json({
          message:"Orders fetched successfully",
          orders               })
     


    } 
     catch( err)
     { 
       
       res.status(500).json({
          mesage: err.message
       })
       console.log( err) ; 
        
     }
     
   }


     async   function getPartnerOrders(   req , res){

          const logedPartnerId = req.foodPartner._id ;  


            const orders= await orderModel.find(

               { foodPartnerId:logedPartnerId}
            ).populate('foodId')
            .populate('userId') ; 


              res.status(200).json({
                 
                message:"Orders fetched successfully",
                orders  
              })
            }  


              
    async  function  acceptOrder(req, res) {

      

        
       
       


    }

               
        
    

module.exports = { placeOrder, myOrders, getPartnerOrders }
