import React, { useState, useEffect } from 'react';
import { Route, Redirect } from 'react-router'
import { CheckUserLogIn } from './CheckUserLogIn';
import { Link } from 'react-router-dom';
import NavBar from './NavBar';
import VisionsBoard from './VisionBoard';
import { UseSelector } from 'react-redux/es/hooks/useSelector';
import { useDispatch } from 'react-redux';
import DateSetting from './utils/DateSetting.js';


function Home() {
    const dispatch = useDispatch();
    console.log("localStorage",localStorage);

    const getWeeklyDateData = DateSetting(dispatch);

    useEffect(()=>{
        
        console.log("homeSUeEffect");
       
    },[getWeeklyDateData])

    
  
    
    // localStorage.clear()
   



    return (
        <>

            <div className='homePageDispaly'>
                <img src={'https://www.oberlo.com/media/1608267092-life-goals.jpg?w=1824&fit=max'} style={{width:'60%', background:'cover'}} />

            </div>
        </>
    )

}

export default Home