import Register from './component/Register.js';
import React, { useState, useEffect } from 'react';
// import '../src/component/styles.css'
import './css/GlobalStyles.css';
import { BrowserRouter as Router, Routes, Route, Navigate, Link } from "react-router-dom";
import PrivateRoute from './component/PrivateRoute.js';
import Home from './component/Home';
import VisionsBoard from './component/VisionBoard.js';
import Profiler from './component/Goal/Profiler.js';
import MoodBoard from './component/MoodBoard.js';
import LogOut from './component/Logout.js';
import Login from './component/Login.js';
import NavBar from './component/NavBar.js';
import GoalDisplay from './component/Goal/GoalDisplay.js';
import Logout from './component/Logout.js';
import Planner from './component/planning/Planner.js';

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
          <Route path="/profiler/:id/*" element={<Profiler isLoggedIn={isLoggedIn} />}  />
          <Route path="/planner/:id/*" element={<Planner isLoggedIn={isLoggedIn} userId={userId}/>}  />

          <Route path="/vision_board/:id/*" element={<VisionsBoard  isLoggedIn={isLoggedIn} />} />
          <Route path="/goal/:goal_id/*" element={<GoalDisplay  isLoggedIn={isLoggedIn} user_id={userId}/>} />
        </Route>
{/* <Route
  element={<PrivateRoute isLoggedIn={isLoggedIn} />}
>
  <Route path="/profiler/:id/*" element={(props) => <profiler {...props} isLoggedIn={isLoggedIn} />} />
  <Route path="/vision_board/:id/*" element={(props) => <VisionsBoard {...props} isLoggedIn={isLoggedIn} />} />
</Route> */}
      </Routes>

    </div>

  )
}



