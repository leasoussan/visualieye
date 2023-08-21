import React, { useState, useEffect } from 'react';
import { Routes, Route, Link, useNavigate } from "react-router-dom";
import CheckUserLogIn from './CheckUserLogIn.js';
// import Logout from './Logout.js';

const NavBar = ({ isLoggedIn, user_id }) => {
  const navigate = useNavigate();


  useEffect(() => {
    console.log("logIN status changed");
    // const userStatus = 
  }, [isLoggedIn]);



  const Logout = async () => {
    try {
      const response = await fetch('/logout', {
        method: 'DELETE',
        //credentials: 'include', >> in the case I have token or cookies.
      });

      // if (response.ok) {
      //     navigate('/')
      // }
    } catch (e) {
      console.log(e);

    }
    navigate('/');
  };


  const loggedInLinks = (
    <>
      <li>
        <Link to="/">Home</Link>
      </li>
      <li>
        <Link to={`/profiler/${user_id}/*`}>Profiler</Link>
      </li>
      <li>
        <Link to={`/vision_board/${user_id}/*`}>vision_board</Link>
      </li>
      <li>
        <Link to={`/planner/${user_id}/*`}>Planner</Link>

      </li>
      <li>
        <Link to="/logout" onClick={Logout}>
          Logout
        </Link>
      </li>
    </>
  );

  const loggedOutLinks = (
    <>
      <li>
        <Link to="/">Home</Link>
      </li>
      <li>
        <Link to="/login">Login</Link>
      </li>
      <li>
        <Link to="/register">Register</Link>
      </li>
    </>
  );

  return (
    <>
      <nav className="navbar">
        {isLoggedIn ? loggedInLinks : loggedOutLinks}
      </nav>
    </>
  );
};

export default NavBar

//-------------------------------------
//          Comment section
//-------------------------------------
//1. Error appearing on line 19 after using logout button;
//
