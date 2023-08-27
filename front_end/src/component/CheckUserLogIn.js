import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Home from './Home';
// import NavBar from './NavBar';
import {navigate}  from '../App.js'


function CheckUserLogIn ({isLoggedIn}){
  
  const navigate = useNavigate();

  console.log("testing the userLogincheck", isLoggedIn);

  useEffect(() => {
    console.log("is the check userLOGIN.js");
    const loggedIn = localStorage.getItem("isLoggin");
    if (loggedIn) {
      isLoggedIn(true);
    } else {
      isLoggedIn(false);
      navigate("/login");
    }
  }, [navigate, isLoggedIn]);

  return null;
};


export default CheckUserLogIn

