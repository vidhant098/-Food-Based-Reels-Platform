const userModel    = require("../models/user.model")
  
const foodPartnerModel = require("../models/foodpartner.model");
 
const jwt = require('jsonwebtoken')

const bcrypt = require('bcrypt');

const isProductionLike =
  process.env.NODE_ENV === 'production' ||
  process.env.RENDER === 'true' ||
  Boolean(process.env.FRONTEND_URL);

const cookieOptions = {
  httpOnly: true,
  sameSite: isProductionLike ? 'none' : 'lax',
  secure: isProductionLike,
};

const USER_TOKEN_COOKIE = 'userToken';
const FOOD_PARTNER_TOKEN_COOKIE = 'foodPartnerToken';
const normalizeEmail = (email) => email?.trim().toLowerCase();
const escapeRegex = (value) => value.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
const findFoodPartnerByEmail = (email) =>
  foodPartnerModel.findOne({
    email: { $regex: `^${escapeRegex(email)}$`, $options: 'i' },
  });

 async function registerUser(req , res )
 {
     const {fullName , password} = req.body ;
     const email = normalizeEmail(req.body.email);

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
    
    res.cookie(USER_TOKEN_COOKIE, token, cookieOptions);
    res.clearCookie(FOOD_PARTNER_TOKEN_COOKIE, cookieOptions);
    res.clearCookie("token", cookieOptions);

    res.status(201).send({message:"user registered successfully" , user:{
        _id:user._id ,
        fullName:user.fullName , 
        email:user.email
    }  })
   
 } 


 async  function loginUser(req , res ){


     const { password } = req.body;
     const email = normalizeEmail(req.body.email);

      const user = await userModel.findOne({email :email }) 

      if(!user)
      {
         return res.status(400).json({message: 'invalid email or password'})
      } 

     const isPasswordValid= await bcrypt.compare(password , user.password) ;  

     
       if(!isPasswordValid)
       {
         return res.status(400).json({message: 'invalid email or password'})
       }

        const token = jwt.sign(
        
            {  id:user._id, },
        process.env.JWT_SECRET ) 


        res.cookie(USER_TOKEN_COOKIE, token, cookieOptions);
        res.clearCookie(FOOD_PARTNER_TOKEN_COOKIE, cookieOptions);
        res.clearCookie("token", cookieOptions);


         res.status(200).json({message:' login successfully' , 
             user:{_id: user._id  ,
                email:user.email,
                fullName:user.fullName
             }
         } )

  }


   function logoutUser(req , res )
   {
     res.clearCookie(USER_TOKEN_COOKIE, cookieOptions)
     res.clearCookie("token", cookieOptions)
     res.status(200).json({message:'logout successfully'})
   } 
    
 
  //   food partner register  controller 

  
    async function registerFoodPartner(req , res )
    {
      try {
        const {
          ownerName,
          password,
          businessName,
          phone,
          address
        } = req.body;
        const email = normalizeEmail(req.body.email);

        if (!ownerName || !businessName || !email || !phone || !address || !password) {
          return res.status(400).json({ message: "all fields are required" });
        }

         const isAccountAlreadyExist =  await findFoodPartnerByEmail(email)
         
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
           

           res.cookie(FOOD_PARTNER_TOKEN_COOKIE, token, cookieOptions);
           res.clearCookie(USER_TOKEN_COOKIE, cookieOptions);
           res.clearCookie("token", cookieOptions);

            res.status(201).json({
                message:"food partner registered successfully "  ,
                _id:foodPartner._id ,
                ownerName:foodPartner.ownerName,
                email:foodPartner.email ,
                businessName:foodPartner.businessName ,
                phone:foodPartner.phone ,
                address:foodPartner.address
                 
            })
      } catch (err) {
        if (err.code === 11000) {
          return res.status(400).json({ message: "account already exist" });
        }

        if (err.name === "ValidationError") {
          return res.status(400).json({ message: err.message });
        }

        console.log(err);
        res.status(500).json({ message: "registration failed" });
      }
    }  

    // food partner login

    async function loginFoodpartner(req  ,res )
    {
      const { password } = req.body ;
      const email = normalizeEmail(req.body.email);

      if (!email || !password) {
        return res.status(400).json({message:"email and password are required"})
      }
  

      
      const  foodPartner = await findFoodPartnerByEmail(email);
       
       if(!foodPartner)
       {
        return res.status(400).json({message:"invalid email or password "})
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
             
             res.cookie(FOOD_PARTNER_TOKEN_COOKIE, token, cookieOptions);
             res.clearCookie(USER_TOKEN_COOKIE, cookieOptions);
             res.clearCookie("token", cookieOptions);

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
      res.clearCookie(FOOD_PARTNER_TOKEN_COOKIE, cookieOptions)
      res.clearCookie("token", cookieOptions)
      res.status(200).json({message:"food partner logout successfully "}) 
     }


   async function getCurrentUser(req , res ){
      
     try{
         const user  = req.user ;
   
      res.status(200).json(
     {
    message:"current user fetched successfully " ,    
    user
    }
      )

     }



     catch(err)
     {
        console.log(err)
        res.status(500).json({message:err.message }) 
       
     }

     
   } 


  module.exports = { registerUser  , 
     loginUser ,
       logoutUser  ,
       registerFoodPartner,
      loginFoodpartner,
      logoutFoodPartner,
      getCurrentUser
  } 
