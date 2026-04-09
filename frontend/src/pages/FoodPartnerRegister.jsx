import React, { useState } from 'react';
import '../styles/auth.css';
import { Link, useNavigate } from 'react-router-dom';
 
import axios from 'axios';
const FoodPartnerRegister = () => { 

  const [loading , setLoading] = useState(false) 
   
   const navigate    = useNavigate() ; 


  const handleSubmit = (e) => {

    e.preventDefault();

     
     const ownerName = e.target.name.value; 
    
      const businessName = e.target.businessName.value

      const email = e.target.email.value; 

   const phone = e.target.phone.value;
  

   const address  = e.target.address.value;
         

   const password  = e.target.password.value ; 
     
 
    try{
 
      const response =  axios.post("http://localhost:3000/api/auth/food-partner/login" ,
     {  ownerName,
        businessName,
       email,
       phone,
       address,
       password

      }  , 
      { withCredentials: true   } 

      )  

      navigate('/')

    } 
    catch(err){ 
 console.log(err)

    }





    console.log('Food Partner Register submitted');
  };

  return (
    <div className="auth-page">
      <div className="auth-container">
        <div className="auth-form">
          <h1>Join as Food Partner</h1>
          
          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <h2>Business name </h2>
              <input 
                type="text"  
                name='businessName'
                placeholder="busines name/brand name"
                required 
              />
            </div>

            <div className="form-group">
              <h2> OwnerName</h2>
              <input
              
                type="text" 
                name="name" 
                placeholder="Owner full name"
                required 
              />
            </div>
 
           <div className="form-group">
              <h2>Email</h2>

              <input 
                type="email"  
                name='email'
                placeholder="restaurant@email.com"
                required 
              />
            </div> 


            <div className="form-group">
              <h2>Phone</h2>
              <input 
                type="number"  
                name='phone'
                placeholder="Phone number"
                required 
              />
            </div>
              

            <div className="form-group">
              <h2>Business Address</h2>
              <input 
                type="text" 
                name='address'
                placeholder="Street, City, PIN"
                required 
              />
            </div>

            

            <div className="form-group">
              <h2>Password</h2>
              <input 
                type="password"  
                name='password'
                placeholder="Create password"
                required 
              />
            </div>

            <div className="form-group">
              <h2>Confirm Password</h2>
              <input 
                type="password" 
                placeholder="Confirm password"
                required 
              />
            </div> 

            <button type="submit" className="submit-btn">
              Create Partner Account
            </button>
          </form>

          <div className="links">

              <p>Already registered? <Link to='/food-partner/login'>Sign in</Link>  </p>
          
            <p>Normal user? <Link to ="/user/register"></Link></p>

          </div>
        </div>
      </div>
    </div>
  );
};

export default FoodPartnerRegister;

