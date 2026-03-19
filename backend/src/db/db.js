    const mongoose = require('mongoose')
   
  function connectDB(){

 
     mongoose.connect(process.env.MONGODB_URL).
      then(()=>{
      console.log("database connected");
  })
  } 

   module.exports = connectDB ;