const userModel    = require("../models/user.model")
const jwt = require('jsonwebtoken')

const bcrypt = require('bcrypt')
 async function registerUser(req , res )
 {
     const {fullName , email   , password} = req.body ; 

     const   isUserExist = await userModel.findOne({email:email}) ; 

      if(isUserExist){
        return res.send({message:"user already exist"})
      }

   const hashedPassword = await bcrypt.hash(password , 10) ;
 
    const user = await userModel.create({
        fullName:fullName , 
        email:email , 
        password:hashedPassword 
    })
 

     const token = jwt.sign(
        
        {  id:user._id, },
    pricess.env.JWT_SECRET )
    
    res.cookie("token" , token ) 

    res.status(201).send({message:"user registered successfully" , user:{
        _id:user._id ,
        fullName:user.fullName , 
        email:user.email
    }  })
   
 } 


 async  function loginUser(req , res ){


     const {email , password } = req.body; 

      user = await userModel.findOne({email :email }) 

      if(!user)
      {
         res.status(400).json({message: 'invalid emai or password'})
      } 

     const isPasswordValid= await bcrypt.compare(password , user.password) ;  

       if(!isPasswordValid)
       {
         res.status(400).json({message: 'invalid email or password'})
       }  

        const token = jwt.sign(
        
            {  id:user._id, },
        process.env.JWT_SECRET ) 


        res.cookie("token" , token ) 


         res.status(200).json({message:' login successfully' , 
             user:{_id: user._id  ,
                email:user.email,
                fullName:user.fullName
             }
         } )

  }



  module.exports = { registerUser  , 
     loginUser
  } 