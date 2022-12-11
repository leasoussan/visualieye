import React from "react";
import NavbarBrand from "react-bootstrap/esm/NavbarBrand";
import { Link } from "react-router-dom";
import Navbar from "./NavBar";
class LogOut extends React.Component{
    constructor(){
        super();
        this.state ={
            isLoggin:false
        }
    }
   
    componentDidMount(){
        console.log(localStorage)
        localStorage.clear()
        document.getElementById('go_to_home').click()
    }   
    // check=  <CheckUserLogIn />
    

    render(){
        return(
            <>
          

            <Link to='/' id='go_to_home' />
         </>
        )
    }
}


export default LogOut