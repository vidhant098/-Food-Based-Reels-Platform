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
    "gjkwehfoewhwewknewfefewf" )
    res.cookie("token" , token ) 

    res.status(201).send({message:"user registered successfully" , user:{
        _id:user._id ,
        fullName:user.fullName , 
        email:user.email
    }  })
   
 } 

  module.exports = { registerUser}