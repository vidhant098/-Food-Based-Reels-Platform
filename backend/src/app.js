// create  server hare 

 const express  = require('express') 
 const cookieParser = require('cookie-parser')
 app.use(cookieParser())
  const app = express()

   app.use(express.json())
module.exports = app ; 