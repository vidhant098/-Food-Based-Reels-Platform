    const mongoose = require('mongoose')
   
  function connectDB(){

 
     mongoose.connect("mongodb://127.0.0.1:27017/zomato").
      then(()=>{
      console.log("database connected");
  })
  } 

   module.exports = connectDB ;