const userModel    = require("../models/user.model")
  
const foodPartnerModel = require("../models/foodpartner.model");
 
const jwt = require('jsonwebtoken')

const bcrypt = require('bcrypt');

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
    process.env.JWT_SECRET )
    
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


   function logoutUser(req , res )
   {
     res.clearCookie("token")
     res.status(200).json({message:'logout successfully'})
   } 
    
 
  //   food partner register  controller 

  
    async function registerFoodPartner(req , res )
    {
     const    {ownerName , email , password  , businessName , phone , address } = req.body ; 

         const isAccountAlreadyExist =  await foodPartnerModel.findOne({email:email})
         
          if(isAccountAlreadyExist)          {
            return res.status(400).json({message:"account already exist "})
          }  

          const   hashedPassword = await bcrypt.hash(password , 10) ;
 
           const  foodPartner =  await foodPartnerModel.create({
           ownerName :ownerName , 
             email:email, 
              businessName:businessName ,
              phone:phone ,
              address:address ,
             password:hashedPassword
        })
         const token = jwt.sign({
            id:foodPartner._id
         } , process.env.JWT_SECRET )       
           

           res.cookie("token" , token ) ; 

            res.status(200).json({
                message:"food partnet regitered successfully "  ,  
                _id:foodPartner._id ,
                ownerName:foodPartner.ownerName,
                email:foodPartner.email ,
                businessName:foodPartner.businessName ,
                phone:foodPartner.phone ,
                address:foodPartner.address
                 
            })
    }  

    // food partner login

    async function loginFoodpartner(req  ,res )
    {
      const {email, password } = req.body ;
      const  foodPartner = await foodPartnerModel.findOne({email:email});
       
       if(!foodPartner)
       {
        res.status(400).json({message:"invalid email or password "})
       } 

          const isPasswordValid= await bcrypt.compare(password , foodPartner.password)  ;  
          if(!isPasswordValid)
          {
          return     res.status(400).json({message:"invalid email or password "})  ;

          }  

           const token = jwt.sign(
            {
            id:foodPartner._id
             } , process.env.JWT_SECRET )   
             
             res.cookie("token" , token ) ; 

             res.status(200).json({
                message:"food partner login successfully"  ,  
                foodPartner: { _id:foodPartner._id ,
                ownerName:foodPartner.ownerName ,
                email:foodPartner.email} 
              
              })
 
    }
  

    //  food partner logout
     async function logoutFoodPartner(req , res )
     {
      res.clearCookie("token")
      res.status(200).json({message:"food partner logout successfully "}) 
     }



  module.exports = { registerUser  , 
     loginUser ,
       logoutUser  ,
      registerFoodPartner,
      loginFoodpartner,
      logoutFoodPartner


  } 