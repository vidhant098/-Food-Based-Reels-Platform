// create  server hare 

 const express  = require('express') 
 const cookieParser = require('cookie-parser')
    const authRoutes = require('./routes/auth.routes')
  
 const foodRoutes = require('./routes/food.routes')


 foodpartnerRoutes = require('./routes/food-partner.routes')
  const cors = require('cors')


    const app = express()

    app.use(cors( 
{
  origin: 'http://localhost:5173', 
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  credentials: true
}


    ))
    app.use(cookieParser())
   app.use(express.json()) 



     app.use('/api/auth' , authRoutes)  //api/auth  is prefix 
     
      app.use('/api/food' , foodRoutes)     

       app.use('/api/food-partner' , foodpartnerRoutes)

     
     module.exports = app ; 