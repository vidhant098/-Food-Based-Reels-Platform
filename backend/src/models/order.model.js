
const  mongoose  = require('mongoose');
 

 const orderSchema = new mongoose.Schema(
    {
 
         userId:{ 

             type:mongoose.Schema.Types.ObjectId , 

             ref:'user',
              required: true  
         } , 

          foodId:{

             type : mongoose.Schema.Types.ObjectId,
             ref:'food',
             required: true
          } , 


           foodPartnerId:{


             type:mongoose.Schema.Types.ObjectId ,
             ref:'foodpartner',
             required:true 
           }  , 
            
            quantity:{
                type:Number,
                required:true ,
                 default:1
            },
             
            totalPrice:{
                  
                 
                 type:Number,
                 required:true  
            }, 
            
            status:{
                type:String,
                enum:[
                    'pending',
                     'accepted', 
                      'preparing',
                      "out_of_delivery", 
                     'canceled', 
                     'delivered',
                     'cancelled'
                    ], 
                default:'pending'
            } 

             

          


     }, {timestamps:true  }
 )
  const orderModel= mongoose.model('order' , orderSchema)
   module.exports = orderModel ;