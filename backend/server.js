//  start server hare
 require('dotenv').config() 

 const app = require('./src/app') ;  

  const connectDB = require('./src/db/db')

  app.listen(3000 , ()=>{
    console.log("server is running in port no 3000")
  })

  connectDB() ;

