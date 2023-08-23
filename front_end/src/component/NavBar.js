// import AppBar from '@mui/material/AppBar';
// import Box from '@mui/material/Box';
// import Toolbar from '@mui/material/Toolbar';
// import Typography from '@mui/material/Typography';
// import Button from '@mui/material/Button';
// import IconButton from '@mui/material/IconButton';
// import MenuIcon from '@mui/icons-material/Menu';
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
      <Container>
        <Navbar.Toggle aria-controls="basic-navbar-nav"/>
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            <Nav.Link href="/">Home</Nav.Link>
            <Nav.Link href={`/profiler/${user_id}/*`}>Profiler</Nav.Link>
            <Nav.Link href={`/vision_board/${user_id}/*`}>vision_board</Nav.Link>
            <Nav.Link  href={`/planner/${user_id}/*`}>Planner</Nav.Link>
            <Nav className="ms-auto">
            <NavDropdown title="Logout" id="basic-nav-dropdown">
              <NavDropdown.Item href="/logout" onClick={Logout}>Logout</NavDropdown.Item>
            </NavDropdown>
            </Nav>
          </Nav>
        </Navbar.Collapse>
      </Container>
  //   <>
  //   <li>
  //     <Link to="/">Home</Link>
  //   </li>
  //   <li>
  //     <Link to={`/profiler/${user_id}/*`}>Profiler</Link>
  //   </li>
  //   <li>
  //     <Link to={`/vision_board/${user_id}/*`}>vision_board</Link>
  //   </li>
  //   <li>
  //     <Link to={`/planner/${user_id}/*`}>Planner</Link>

  //   </li>
  //   <li>
  //     <Link to="/logout" onClick={Logout}>
  //       Logout
  //     </Link>
  //   </li>
  // </>
  );

  const loggedOutLinks = (
    
      <Container>
        <Navbar.Toggle aria-controls="basic-navbar-nav"/>
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            <Nav.Link href="/">Home</Nav.Link>
            <Nav.Link href="/login">Login</Nav.Link>
            <Nav.Link href="/register">Register</Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Container>
  //   <>
  //   <li>
  //     <Link to="/">Home</Link>
  //   </li>
  //   <li>
  //     <Link to="/login">Login</Link>
  //   </li>
  //   <li>
  //     <Link to="/register">Register</Link>
  //   </li>
  // </>
  );

  // const styles = {
  //   backgroundColor: 'blue',
  //   color: 'white',
  //   padding: '10px',
  // };
  return (
    <Navbar expand="lg" bg="light" className="bg-body-tertiary">
      {isLoggedIn ? loggedInLinks : loggedOutLinks}
    </Navbar>
    
  );
};

export default NavBar



{/* <Navbar expand="lg" className="bg-body-tertiary">
      <Container>
        <Navbar.Toggle aria-controls="basic-navbar-nav"/>
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            <Nav.Link href="/">Home</Nav.Link>
            <Nav.Link href={`/profiler/${user_id}/*`}>Profiler</Nav.Link>
            <Nav.Link href={`/vision_board/${user_id}/*`}>vision_board</Nav.Link>
            <Nav.Link href={`/planner/${user_id}/*`}>Planner</Nav.Link>
            <NavDropdown title="Dropdown" id="basic-nav-dropdown">
              <NavDropdown.Item href="#action/3.1">Action</NavDropdown.Item>
              <NavDropdown.Item href="#action/3.2">
                Another action
              </NavDropdown.Item>
              <NavDropdown.Item href="#action/3.3">Something</NavDropdown.Item>
              <NavDropdown.Divider />
              <NavDropdown.Item href="#action/3.4">
                Separated link
              </NavDropdown.Item>
            </NavDropdown>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar> */}