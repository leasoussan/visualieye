import Register from './component/Register.js';
import React, { useState, useEffect } from 'react';
// import '../src/component/styles.css'
import { BrowserRouter as Router, Routes, Route, Navigate, Link } from "react-router-dom";
import PrivateRoute from './component/PrivateRoute.js';
import Home from './component/Home';
import VisionsBoard from './component/VisionBoard.js';
import Profile from './component/Profile.js';
import MoodBoard from './component/MoodBoard.js';
import LogOut from './component/Logout.js';
import Login from './component/Login.js';
import NavBar from './component/NavBar.js';
import GoalDisplay from './component/Goal/GoalDisplay.js';
import Logout from './component/Logout.js';
import GoalsList from '../src/component/Goal/GoalsList.js';


export default function App(props) {

  const [isLoggedIn, setIsLoggedIn] = useState(localStorage.getItem('isLoggin') != null);
  const userId = localStorage.getItem('user_id')
 

  return (


    <div>
      <NavBar isLoggedIn={isLoggedIn} user_id={userId} setIsLoggedIn={setIsLoggedIn} />

      <Routes>
        <Route path="/" element={<Home />} />

        <Route path="/logout" element={<Logout setIsLoggedIn={setIsLoggedIn} />} />
        <Route path="/login" element={<Login setIsLoggedIn={setIsLoggedIn} />} />
        <Route path="/register" element={<Register />} />
        <Route element={<PrivateRoute isLoggedIn={isLoggedIn} />}>
          <Route path="/profile/:id/*" element={<Profile isLoggedIn={isLoggedIn} />}  />
          <Route path="/goals_list/:id/*" element={<GoalsList isLoggedIn={isLoggedIn} />}  />

          <Route path="/vision_board/:id/*" element={<VisionsBoard  isLoggedIn={isLoggedIn} />} />
        </Route>
{/* <Route
  element={<PrivateRoute isLoggedIn={isLoggedIn} />}
>
  <Route path="/profile/:id/*" element={(props) => <Profile {...props} isLoggedIn={isLoggedIn} />} />
  <Route path="/vision_board/:id/*" element={(props) => <VisionsBoard {...props} isLoggedIn={isLoggedIn} />} />
</Route> */}
      </Routes>

    </div>

  )
}
