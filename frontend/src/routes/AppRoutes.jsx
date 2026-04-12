import React from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom' 
import UserRegister from '../pages/UserRegister';
import UserLogin from '../pages/UserLogin';
import FoodPartnerRegister from '../pages/FoodPartnerRegister';
import FoodPartnerLogin from '../pages/FoodPartnerLogin'; 
 
import CreateFood from '../pages/food-partner/CreateFood';
import Home from '../pages/general/Home';

const AppRoutes = () => {
  return (
    <Router>
      <Routes>
        <Route path='/user/register' element={<UserRegister />} />
        <Route path='/user/login' element={<UserLogin />} /> 

        <Route path="/food-partner/register" element={<FoodPartnerRegister />} />
        <Route path="/food-partner/login" element={<FoodPartnerLogin />} />
        
        <Route path='/'element={<Home />} />

  <Route   path ="/create-food" element={<CreateFood />} />

      </Routes>
    </Router>
  )
}

export default AppRoutes
