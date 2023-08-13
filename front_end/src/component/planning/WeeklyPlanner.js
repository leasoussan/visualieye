import React, { useEffect, useState } from "react";
import './planning.css';
import SlotDetail from "./SlotDetail.js";

// This Component aim to Display a weekly planner Vizual, with time slots for 24 hours a day.
// User can enter via a form hiw weekly timeslots according to the week to come. 
// the FORM will give all the options available (pre_set) tht one can have. 
// all slots are not mandatory yet.


const WeeklyPlanner = () => {
  const [currentWeek, setCurrentWeek] = useState([]);
  const [slotsList, setSlotsList] = useState([])

  useEffect(()=>{
    renderWeek();
  },[])

  const renderWeek = () => {
    const days = ['sunday', 'monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday']
    const date = new Date();;
    const dayOfMonth = date.getDate();
    const currentDay = date.getDay();
    // const year = date.getFullYear()
    // const month = date.getMonth()+1;


    // const getDaysInCurrentMonth = (year, month) => {
    //   return new Date(year, month, 0).getDate();
    //   };

    const getWeekDates = (currentDay, dayOfMonth)=>{
      const weekDay = currentDay;
      const startDay = dayOfMonth - weekDay;
      const weekDates = days.map((day,index)=>{
        return{ day,value: startDay + index };
      });
      setCurrentWeek(weekDates);
    };
    getWeekDates(currentDay, dayOfMonth);
  };

  const setdayHours = ()=>{
    const fullDay = Array.from(Array(24), (_, index)=> index + 1);

    const slots = fullDay.flatMap((hour)=>{
      const minutes = [0, 20, 40]
      
      return minutes.map((pomedoro, index)=>(
        <p key={`${hour}-${index}`} className="pomedoro_slots"> 
        <span>{`${hour}:${pomedoro}`} </span>
        </p>
      ))
    })


    return(
      <>
      <div className="slots">
      {slots}
      </div>
      </>
    )
  };

  const renderPlanning =currentWeek.map((day, index) => (
    <div key={index} className="daily_hours_container">
      <h4>{day.day} {day.value}</h4>
      <div className="hours_label_box">
      {setdayHours()}

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

export default WeeklyPlanner

