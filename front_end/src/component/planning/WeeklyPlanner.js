import React, { useEffect, useState } from "react";
// import './planningStyles.css';
import '../../css/plannerStyles.css'
import SlotDetail from "./SlotDetail.js";


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
      const minutes = ['00', 20, 40]
      
      return minutes.map((pomedoro, index)=>(
        <p key={`${hour}-${index}`} className="pomedoro_slots"> 
        <span>{`${hour < 10 ? '0' + hour.toString() : hour}:${pomedoro}`} </span>
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
      <h4 className="height-40vh">{day.day} {day.value}</h4>
      <div className="hours_label_box">
      {setdayHours()}

      </div>
    
    </div>
  ));


  return (
    <>
      <div className="weekly_planing_display bg-light">
          {renderPlanning}
        {/* <SlotDetail /> */}
      </div>
    </>
  )
};

export default WeeklyPlanner


// import React, { useState } from 'react';
// import './planningStyles.css';

// const WeeklyPlanner = () => {
//   const [currentWeek, setCurrentWeek] = useState(0);

//   const handlePrevWeek = () => {
//     setCurrentWeek(currentWeek - 1);
//   };

//   const handleNextWeek = () => {
//     setCurrentWeek(currentWeek + 1);
//   };

//   const renderDays = () => {
//     const days = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];
//     const startDate = new Date();
//     console.log("startDate", startDate);
//     console.log("getDate", startDate.getDate());

//     // startDate.setDate(startDate.getDate() + (currentWeek * 7));

//     return days.map((day, index) => {
//       const currentDate = new Date(startDate);
//       console.log("currentDate", currentDate);
//       currentDate.setDate(startDate.getDate() + index);
//       const dayOfMonth = currentDate.getDate();
//       console.log("dayOfM",dayOfMonth);

//       return (
//         <div key={day} className="day-column">
//           <div className="day-header">{day}</div>
//           <div className="time-slots">
//             {renderTimeSlots()}
//           </div>
//           <div className="day-footer">{dayOfMonth}</div>
//         </div>
//       );
//     });
//   };

//   const renderTimeSlots = () => {
//     const timeSlots = [];

//     for (let hour = 0; hour < 24; hour++) {
//       for (let minute = 0; minute < 60; minute += 20) {
//         const time = `${hour.toString().padStart(2, '0')}:${minute.toString().padStart(2, '0')}`;

//         timeSlots.push(
//           <div key={time} className="time-slot">
//             {time}
//           </div>
//         );
//       }
//     }

//     return timeSlots;
//   };

//   return (
//     <div className="weekly-planner">
//       <div className="planner-header">
//         <button onClick={handlePrevWeek}>&lt; Previous Week</button>
//         <h1>Weekly Planner</h1>
//         <button onClick={handleNextWeek}>Next Week &gt;</button>
//       </div>
//       <div className="planner-content">{renderDays()}</div>
//     </div>
//   );
// };

// export default WeeklyPlanner;