import React, { useEffect, useState } from "react";
import './planning.css';
import WeeklySlotsDisplay from "./WeeklySlotsDisplay.js";
import { useSelector } from "react-redux";
// This Component aim to Display a weekly planner Vizual, with time slots for 24 hours a day.
// User can enter via a form hiw weekly timeslots according to the week to come. 
// the FORM will give all the options available (pre_set) tht one can have. 
// all slots are not mandatory yet.


const WeeklyPlannerDisplay = ({current_week}) => {
  
  const globalSlotsTypes = useSelector(state => state.globalDataReducer.slotsTypes);
  const userWeeklyData = useSelector(state => state.userReducer.userCurrentWeekData);
  const currentWeek = useSelector(state => state.globalDataReducer.currentWeekDateData);

  console.log("weekly planner display currentWeek", currentWeek);

  
  const renderPlanning =Object.entries(currentWeek.weekDates).map(([index, day]) =>(
    
    <div key={index} className="daily_hours_container">
      <h4>{day.day_name} {`${day.day_date.substring(8,10)}/${day.day_date.substring(5,7)}`}</h4>
      <div className="hours_label_box">

    <WeeklySlotsDisplay  currentWeek={current_week}/>

      </div>

    </div>
  ));


  
    

  return (
    <>
      <div className="weekly_planing_display">
        {renderPlanning} 


      </div>
    </>
  )
};

export default WeeklyPlannerDisplay

