import React, { useEffect, useState } from "react";
import './planning.css';
import WeeklySlotsDisplay from "./WeeklySlotsDisplay.js";

// This Component aim to Display a weekly planner Vizual, with time slots for 24 hours a day.
// User can enter via a form hiw weekly timeslots according to the week to come. 
// the FORM will give all the options available (pre_set) tht one can have. 
// all slots are not mandatory yet.


const WeeklyPlannerDisplay = () => {
  const [currentWeek, setCurrentWeek] = useState([]);

  useEffect(() => {
    renderWeek();
  }, [])

  const renderWeek = () => {
    const days = ['sunday', 'monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday']
    const date = new Date();;
    const dayOfMonth = date.getDate();
    const currentDay = date.getDay();

    const getWeekDates = (currentDay, dayOfMonth) => {
      const weekDay = currentDay;
      const startDay = dayOfMonth - weekDay;
      const weekDates = days.map((day, index) => {
        return { day, value: startDay + index };
      });
      setCurrentWeek(weekDates);
    };
    getWeekDates(currentDay, dayOfMonth);

    
  };


  const renderPlanning = currentWeek.map((day, index) => (
    <div key={index} className="daily_hours_container">
      <h4>{day.day} {day.value}</h4>
      <div className="hours_label_box">
    <WeeklySlotsDisplay  currentWeek={currentWeek}/>
    
      </div>

    </div>
  ));


  return (
    <>
      <div className="weekly_planing_display">
        {renderPlanning}

        {/* <SlotDetail /> */}

      </div>
    </>
  )
};

export default WeeklyPlannerDisplay

