   let mongoose =  require('mongoose') ; 

    let userSchema = new mongoose.Schema({
        

        fullName:{
              type:String, 
               required : true 

        } , 
 

          email:{
         type:String , 
         required: true ,
         unique:true 

          } ,
         password:
         {
          type: String, 
          required:true
          
  
         }  , 
        
       
    },
    {
        timestamps:true 
    }

) 

    let userModel = mongoose.model('user'   ,userSchema ) 
       module.exports= userModel