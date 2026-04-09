   let mongoose =  require('mongoose') ; 

let foodPartnerSchema = new mongoose.Schema({
   
    ownweName:{
        type:String , 
        required:true 
    } ,
    businessName:{
        type:String ,   
        required:true
    } ,
   
    phone:{
        type:String , 
        required:true 
    } ,
  
     address:{
        type:String , 
        required:true
     },

    email:{
        type:String , 
        required:true ,   
        unique:true
    } ,  


        
        password:{

         type:String , 
         required:true

        }

    }, {
             timestamps: true 
    }) 

      const foodPartnerModel = mongoose.model("foodpartner" , foodPartnerSchema)
      module.exports= foodPartnerModel; 
