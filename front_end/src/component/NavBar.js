import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import React, { useState, useEffect } from 'react';
import { Routes, Route, Link, useNavigate } from "react-router-dom";
import '../css/navbarStyles.css';
import CheckUserLogIn from './CheckUserLogIn.js';
import Logout from './Logout.js';

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

  const loggedInLinksLeft = (
  <>
    <Nav.Link href="/">Home</Nav.Link>
    <Nav.Link href={`/profiler/${user_id}/*`}>Profiler</Nav.Link>
    <Nav.Link href={`/vision_board/${user_id}/*`}>vision_board</Nav.Link>
    <Nav.Link  href={`/planner/${user_id}/*`}>Planner</Nav.Link>
  </>
  );

  const loggedInLinksRight = (
    <NavDropdown title="Logout" id="basic-nav-dropdown">
      <NavDropdown.Item href="/logout" onClick={Logout}>Logout</NavDropdown.Item>
    </NavDropdown>
  );
            

  const loggedOutLinksLeft = (
      <>
      <Nav.Link href="/">Home</Nav.Link>
      </>
  );

  const loggedOutLinksRight = (
  <>
    <Nav.Link href="/login">Login</Nav.Link>
    <Nav.Link href="/register">Register</Nav.Link>
  </>
  );

  return (
    <>
    <style type='text/css'>
      {`
      .navbar {
        --bs-navbar-color: black;
        background: white;
        --bs-navbar-hover-color: #e4734f;
      }`}
    </style>
  <Navbar expand="lg"  className='navbarMain'>
    <Container>
      <Navbar.Toggle aria-controls="navbarScroll" />
      <Navbar.Collapse id="navbarScroll">
        <Nav
          className="me-auto my-2 my-lg-0"
          style={{ maxHeight: '100px'}}
          navbarScroll
        >
          {isLoggedIn ? loggedInLinksLeft : loggedOutLinksLeft}
        </Nav>
      </Navbar.Collapse >
      <Nav>
        {isLoggedIn ? loggedInLinksRight : loggedOutLinksRight}
      </Nav>
    </Container>
  </Navbar>
  </>

);
  };

export default NavBar

