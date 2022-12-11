import logo from './logo.svg';
import './App.css';
import Register from './component/Register';
import AddGoalForm from './component/AddGoalForm';

import axios from 'axios';
import React, { useState, useEffect } from 'react';
import GoalsList from './component/GoalsList';
import '../src/component/styles.css'
import { BrowserRouter as Router, Route, Redirect, Routes, Link} from "react-router-dom";
import Home from './component/Home';
import VisionsBoard from './component/VisionBoard';
import Profile from './component/Profile';
import MoodBoard from './component/MoodBoard';
import LogOut from './component/LogOut';
import LogIn from './component/LogIn';
import {CheckUserLogIn} from './component/CheckUserLogIn';
// import CheckUserLogIn from './component/CheckUserLogIn';

import NavBar from './component/NavBar';

export default function App(props) {


  const check_user_id = () => {
    const getuser = localStorage.getItem('isLoggin');
    if (getuser) {
        const getUserId = getuser.split(',')[0]
        console.log("getUserId", localStorage);
        return getUserId
    }
    else {
        return 0
    }

};check_user_id()

const setLoggedIn = () => {
    if (check_user_id() === 0) {
        return false
    }else{
        return true
    }
}
setLoggedIn()


  const username = () => {
    const getUsername = localStorage.getItem('isLoggin');
    if (getUsername) {
      const userName = getUsername.split(',')[1]
      return userName
  
  }
  }
  return (

    <>
    
      <CheckUserLogIn />
        <Link to='/login' id='go_to_login'/>
        <NavBar user_id={check_user_id()} Logged={setLoggedIn()} username={username()} />
      
        <Routes>
    
          <Route path="/" element={<Home />} />
          <Route path="/vision_board" element={<VisionsBoard />} />
          <Route path="/my_goals/:id" element={<GoalsList/>} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/my_mood_borad" element={<MoodBoard />} />
          <Route path="/logout" element={<LogOut />} />
          <Route path="/login" element={<LogIn />} />
         <Route path="/register" element={<Register />} />
         </Routes>
        
      
    </>

  )
}
