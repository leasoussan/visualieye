import { Routes, Route, Link } from "react-router-dom";
import React, { useState, useEffect } from 'react';

import Home from "./Home";
import AddGoalForm from "./AddGoalForm";
import VisionsBoard from "./VisionBoard";
import GoalsList from "./GoalsList";
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import Register from "./Register";
import {CheckUserLogIn} from "./CheckUserLogIn";


const  NavBar=({user_id, Logged, username})=> {

    let menu;

  
    if (Logged === false) {
        menu= (

            <div className="nav_main">


                <div className="right_nav">

                    <div className="login">

                        <ul>
                            <Link to="/login">login</Link>
                        </ul>

                    </div>
                    <div className="register">
                        <ul>
                            <Link to="/register">Register</Link>
                        </ul>
                    </div>
                </div>

            </div>
        )
    }
    else {

        menu= (
            <>
                <div className="nav_main">
                    <>
                        <div className="left_nav">
                            <i>icon</i>
                            <div className="nav_bar_logged">
                                <ul>
                                    <Link to="/">Home</Link>
                                </ul>
                                <ul>
                                    <Link to="/vision_board">Vision Board</Link>
                                </ul>
                                <ul>
                                    <Link to={`/my_goals/${user_id}`}>My Goals</Link>
                                </ul>
                                <ul>
                                    <Link to="/profile">Profile</Link>
                                </ul>
                            </div>
                        </div>

                        <div className="right_nav">

                            <div className="login">

                                <ul>
                                    <h4>Hello Dear { }</h4>
                                </ul>
                                <ul>
                                    <Link to="/logout">logout</Link>
                                </ul>
                            </div>

                        </div>
                    </>
                </div>



            </>
        )
    }

    return ( 
        <nav className="navbar">
       {menu}
    
        </nav>
       );
}

export default NavBar;





