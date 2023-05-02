import React, { useState, useEffect } from 'react';
import { Routes, Route, Link, useNavigate } from "react-router-dom";
import CheckUserLogIn from './CheckUserLogIn.js';
// import Logout from './Logout.js';

const NavBar = ({ isLoggedIn, setIsLoggedIn, user_id }) => {
  const navigate = useNavigate('');


  useEffect(() => {
    console.log("logIN status changed");
    // const userStatus = 
  }, [isLoggedIn]);


  const handleLogout = async () => {

    setIsLoggedIn(false);
    localStorage.removeItem('user_id');
    navigate('/');
    // try {
    //   const response = await fetch('http://localhost:5000/logout', {
    //     method: 'DELETE',
    //     credentials: 'include',
    //   });

    //   if (response.ok) {
    //     setIsLoggedIn(false);
    //     localStorage.removeItem('user_id');
    //     navigate('/');
    //   } else {
    //     console.error('Error in logout: ' + response.status);
    //   }
    // } catch (error) {
    //   console.error('Error in logout:', error);
    // }
  };
  const loggedInLinks = (
    <>
      <li>
        <Link to="/">Home</Link>
      </li>
      <li>
        <Link to={`/vision_board/${user_id}`}>vision_board</Link>
      </li>
      <li>
        <Link to={`/profile/${user_id}`}>Profile</Link>

      </li>
      <li>
        <Link to="/logout" onClick={handleLogout}>
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
        {isLoggedIn ? (
          loggedInLinks
        ) : (
          loggedOutLinks
        )}
      </nav>
    </>
  );
};

export default NavBar