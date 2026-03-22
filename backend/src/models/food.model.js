const { default: mongoose } = require('mongoose');
const mongooser = require('mongoose') ;

 const foodSchema = new mongooser.Schema({ 

name:{
    type:String,
    required :true  
},
video:{
    type:String,
    requires:true

},
 description:{
    type:String,
 },
 foodPartner:{
    type: mongooser.Schema.Types.ObjectId ,
    ref:"foodpartner"
 }

 })

  const foodModel = mongoose.model("food" ,foodSchema)
  
  module.exports= foodModel