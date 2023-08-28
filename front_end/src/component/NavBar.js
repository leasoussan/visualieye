import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import { LinkContainer } from 'react-router-bootstrap'; // Import LinkContainer for integration with React Router

import React, { useState, useEffect } from 'react';
import { Routes, Route, Link, useNavigate } from "react-router-dom";
// import '../css/navbarStyles.css';
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
    <Nav>
  <LinkContainer to="/">
    <Nav.Link>Home</Nav.Link>
  </LinkContainer>
  <LinkContainer to={`/profiler/${user_id}/*`}>
    <Nav.Link>Profiler</Nav.Link>
  </LinkContainer>
  <LinkContainer to={`/vision_board/${user_id}/*`}>
    <Nav.Link>vision_board</Nav.Link>
  </LinkContainer>
  <LinkContainer to={`/planner/${user_id}/*`}>
    <Nav.Link>Planner</Nav.Link>
  </LinkContainer>
</Nav>
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
    <Nav.Link href="/login">Log in</Nav.Link>
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

