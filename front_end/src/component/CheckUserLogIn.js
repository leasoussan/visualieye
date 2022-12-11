import React, { useState, useRef, useEffect } from 'react'
import Home from './Home';
import { Link } from 'react-router-dom';
import NavBar from './NavBar';

// 

export function CheckUserLogIn() {

  function getUser(){
    const getLocalStorage =  localStorage.getItem('isLoggin');
    if(getLocalStorage === null){
     document.getElementById('go_to_login')

    }else{
      const user_id = localStorage.getItem('isLoggin').split(',')[0]
    }
  };
  getUser()


  
    // const test=() => {
    //   const getStorage  =  localStorage.getItem('isLoggin')
    //   if(getStorage === true){
    //     const getUser =localStorage.getItem('isLoggin')
    //     console.log(getUser);

    //   }else{
    //     console.log("ya pas");
 
    //   }

    return(
        <>
       
          {/* <Link to='/login' id='go_to_login' get_login_button={get_login_button} /> */}
        </>
    )
}
    




