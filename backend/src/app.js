// create  server hare 

 const express  = require('express') 
 const cookieParser = require('cookie-parser')
    const authRoutes = require('./routes/auth.routes')
 
    const app = express()
    app.use(cookieParser())
   app.use(express.json()) 



     app.use('/api/auth' , authRoutes)  //api/auth  is prefix 
    module.exports = app ; 