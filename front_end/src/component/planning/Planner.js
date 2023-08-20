import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from 'react-redux';
import { DateTime } from 'luxon';
import WeeklyPlannerDisplay from "./WeeklyPlannerDisplay.js";
import WeeklySlotsDisplay from "./WeeklySlotsDisplay.js";
import WeeklySlotsForm from "./WeeklyPlaningForm.js";
import WeeklyPlanningForm from "./WeeklyPlaningForm.js";
import { setUserCurrentWeekData,setSlotTypesData } from "../../actions.js"

// The Planner Component usage is to hold data that will allow to display Callendar of 
// Present week, with a button to display past week and the next week.
// slots types import is important in order to be able to manipulate data according to type.
// USER STORY :
// - user wants to be able to go on the planner page- to visualze his week clearly and to understant how his time is managed
//  -User wants to be able to Plan hi week at once a week via the FORM.
//  -User wants to be able to modify his weekly planner
// - user want to be able to see what time is left to be planed
//  - user wants to be able visualized past week, and understand paterns and success
// - users want to be able to visualize next week - but wont be able to save neither past week and future week


const Planner = ({ isLoggedIn, userId }) => {
  const dispatch = useDispatch();
  
  const [slotsTypes, setSlotsTypes] = useState([]);
  const [currentWeek, setCurrentWeek] = useState([]);
  const [weekNumber, setWeekNumber] = useState(null);
  // Modal -set Week open/close Management
  const [show, setShow] = useState(false);
  const closeModal = () => setShow(false);
  const showModal = () => setShow(true);



  useEffect(() => {
    renderWeek();
    getSlotsTypesCategories();
    fetchUserCurrentWeek();

    // Call the fetchUserCurrentWeek function and then renderWeek
  }, [dispatch])



  const renderWeek = () => {
    const days = ['sunday', 'monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday']
    
    const getWeekDates = () => {
      const setDate = DateTime.now();
      const date = setDate;
      console.log("date", date);
      
      const dayOfMonth = date.day;
      const weekDay = date.weekday  === 7 ? 0  : date.weekday;
      const currentMonth = date.month;
      const currentWeekNumber = date.weekNumber +1;


      const startDay = dayOfMonth - weekDay;
      const startOfWeek = date.set({'weekday':0});

      const weekDates = days.map((day, index) => {
        return { day, value: (`${startDay + index}/${currentMonth}`) };
      });
      setWeekNumber(currentWeekNumber)
      setCurrentWeek(weekDates);
    };
    getWeekDates();
  };



  const getSlotsTypesCategories = async () => {
    try {
      const response = await fetch(`http://localhost:5000/get_slots_types`);

      if (response.ok) {
        const data = await response.json()
        console.log("data", data);
        dispatch(setSlotTypesData(data))
      } else {
        console.log("Issue here planner line 24");
      }
    }
    catch (e) {

    }

  };



  const fetchUserCurrentWeek = async () => {
    try {
      const user_id = userId;
      const week_number = weekNumber;
     
      const response = await fetch(`http://localhost:5000/get_user_current_week_data/${user_id}/${week_number}`);

      if (response.ok) {
        const data = await response.json();

        dispatch(setUserCurrentWeekData(data));
       
      } else {
        console.log("no weeekly data yet ");
      }
    }
    catch (e) {
      console.log("error in fetching user weekly data");
    }


  };    


  




  const setPlanning = () => {

  }


  return (

    <div>
      <WeeklyPlanningForm currentWeek={currentWeek}  userId={userId} showModal={showModal} closeModal={closeModal} />
      <button >PAST WEEK </button>
      <button >NEXT WEEK  </button>
      <WeeklyPlannerDisplay currentWeek={currentWeek} slotsTypes={slotsTypes} userId={userId} />

    </div>
  );
};

export default Planner;





