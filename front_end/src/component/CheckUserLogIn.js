import React, { useState, useRef, useEffect } from 'react'
import Home from './Home';
import { Link } from 'react-router-dom';
import NavBar from './NavBar';

// 

export function CheckUserLogIn() {

  const user = localStorage.getItem('user');
  console.log("we rare checking here");
  return !! user ; 
  // if the user is logged in = true else return false
}
    




