import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import React, { useState, useEffect } from 'react';
import { Routes, Route, Link, useNavigate } from "react-router-dom";
import '../css/navBarStyles.css';
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

  const loggedInLinks = (
    <Container fluid>
    <Navbar.Toggle aria-controls="navbarScroll" />
    <Navbar.Collapse id="navbarScroll">
          <Nav>
            <Nav.Link href="/">Home</Nav.Link>
            <Nav.Link href={`/profiler/${user_id}/*`}>Profiler</Nav.Link>
            <Nav.Link href={`/vision_board/${user_id}/*`}>vision_board</Nav.Link>
            <Nav.Link  href={`/planner/${user_id}/*`}>Planner</Nav.Link>
          </Nav>
          </Navbar.Collapse>
          <NavDropdown title="Logout" id="basic-nav-dropdown">
          <NavDropdown.Item href="/logout" onClick={Logout}>Logout</NavDropdown.Item>
        </NavDropdown>
        </Container>
  );
            

  const loggedOutLinks = (
    <Container fluid>
    <Navbar.Toggle aria-controls="navbarScroll" />
    <Navbar.Collapse id="navbarScroll">
        <Nav
          className="me-auto my-2 my-lg-0"
          style={{ maxHeight: '100px' }}
          navbarScroll
        >
          <Nav>
            <Nav.Link href="/">Home</Nav.Link>
            <Nav.Link href="/login">Login</Nav.Link>
            <Nav.Link href="/register">Register</Nav.Link>
          </Nav>
        </Nav>
        </Navbar.Collapse>
        </Container>
  );

  return (
    <Navbar expand="lg" bg="light" className="bg-body-tertiary">
      {isLoggedIn ? loggedInLinks : loggedOutLinks}
      </Navbar>
);
  }

export default NavBar

