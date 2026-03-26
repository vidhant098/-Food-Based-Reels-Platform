const { default: mongoose } = require('mongoose');
const mongooser = require('mongoose') ;

 const foodSchema = new mongooser.Schema({ 
 
video:{
    type:String,
    requires:true

},

name:{
    type:String,
    required :true  
},

 description :{
    type:String,
 },
 foodPartner:{
    type: mongooser.Schema.Types.ObjectId ,
    ref:"foodpartner"
 }

 })

  const foodModel = mongoose.model("food" ,foodSchema)
  
  module.exports= foodModel