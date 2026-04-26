//  start server hare
 require('dotenv').config() 

 const app = require('./src/app') ;  

  const connectDB = require('./src/db/db')

  app.listen(process.env.PORT || 3000 , ()=>{
    console.log("server is running  ")
  })

  connectDB() ;

