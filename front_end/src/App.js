import Register from './component/Register.js';
import React, { useState, useEffect } from 'react';
import '../src/component/styles.css'
import { BrowserRouter as Router, Route, Redirect, Routes, Link } from "react-router-dom";
import PrivateRoute from './component/PrivateRoute.js';
import Home from './component/Home';
import VisionsBoard from './component/VisionBoard.js';
import Profile from './component/Profile.js';
import MoodBoard from './component/MoodBoard.js';
import LogOut from './component/Logout.js';
import Login from './component/Login.js';

import NavBar from './component/NavBar.js';
import GoalDisplay from './component/GoalDisplay.js';
import Logout from './component/Logout.js';
import GoalsList from './component/GoalsList.js';



export default function App(props) {

  const [isLoggedIn, setIsLoggedIn] = useState(localStorage.getItem('isLoggin') != null);
  const userId = localStorage.getItem('user_id') 
  console.log("userId in app", userId);
  return (


    <div>
      <NavBar isLoggedIn={isLoggedIn}  user_id={userId} setIsLoggedIn={setIsLoggedIn}/>

      <Routes>
        <Route path="/" element={<Home />} />

        <Route path="/logout" element={<Logout setIsLoggedIn={setIsLoggedIn} />} />
        <Route path="/login" element={<Login setIsLoggedIn={setIsLoggedIn} />} />
        <Route path="/register" element={<Register />} />
    
        <Route path="/vision_board/:id" element ={<PrivateRoute> component={VisionsBoard} isLoggedIn={isLoggedIn}</PrivateRoute> }/>
        <Route path="/a_goal/:id" element ={<PrivateRoute> component={GoalDisplay} isLoggedIn={isLoggedIn}</PrivateRoute> }/>
        <Route path="/goals_list/:id" element ={<PrivateRoute> component={GoalsList} isLoggedIn={isLoggedIn}</PrivateRoute> }/>
        <Route path="/profile/:id" element={<PrivateRoute component={Profile} isLoggedIn={isLoggedIn} />} />

        <Route path="/mood_Board/:id" element ={<PrivateRoute> component={VisionsBoard} isLoggedIn={isLoggedIn}</PrivateRoute> }/>
       
        {/* <PrivateRoute path="/my_goals:id" component={VisionsBoard} isLoggedIn={isLoggedIn} />
        <PrivateRoute path="/a_goal:id" component={VisionsBoard} isLoggedIn={isLoggedIn} />
        <PrivateRoute path="/profile:id" component={VisionsBoard} isLoggedIn={isLoggedIn} />
        <PrivateRoute path="/mood_Board:id" component={VisionsBoard} isLoggedIn={isLoggedIn} />
     */}

      </Routes>

    </div>

  )
}
