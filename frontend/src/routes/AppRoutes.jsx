import React from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import UserRegister from '../pages/UserRegister';
import UserLogin from '../pages/UserLogin';
import FoodPartnerRegister from '../pages/FoodPartnerRegister';
import FoodPartnerLogin from '../pages/FoodPartnerLogin';

import CreateFood from '../pages/food-partner/CreateFood';
import Home from '../pages/general/Home';
import Saved from '../pages/general/Saved';
import Profile from '../pages/food-partner/Profile';
import UserProfile from '../pages/User/UserProfile';
import Logout from '../pages/User/Logout';
import BottomNav from '../components/BottomNav';
import MyProfile from '../pages/food-partner/MyProfile';

const AppRoutes = () => {
  return (
    <Router>
      <Routes>
        <Route path='/user/register' element={<UserRegister />} />
<Route path='/user/login' element={<UserLogin />} />
        <Route path="/food-partner/register" element={<FoodPartnerRegister />} />
        <Route path="/food-partner/login" element={<FoodPartnerLogin />} />

        <Route path='/' element={<Home/>} /> 

   

        <Route path='/saved' element={<Saved />} />

        <Route path="/create-food" element={<CreateFood />} />
        <Route path='/food-partner/:id' element={<Profile />} />

         <Route  path='/user/profile'   element={ <UserProfile/>}/>

        <Route path='/user/logout' element={<Logout />} />

        <Route  path ='navbar' element={<BottomNav/>} />

        <Route path ='/foodPartnerOwn/profile'  element={<MyProfile/>}/>
      </Routes>
    </Router>
  )
}

export default AppRoutes
