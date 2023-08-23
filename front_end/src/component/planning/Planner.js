import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from 'react-redux';
import { DateTime } from 'luxon';
import WeeklyPlannerDisplay from "./WeeklyPlannerDisplay.js";
import WeeklySlotsDisplay from "./WeeklySlotsDisplay.js";
import WeeklySlotsForm from "./WeeklyPlaningForm.js";
import WeeklyPlanningForm from "./WeeklyPlaningForm.js";
import { setUserCurrentWeekData,setSlotTypesData } from "../../actions.js"
// import { RenderWeek } from "./RenderWeek.js";
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
  
  const currentWeek = useSelector(state => state.globalDataReducer.currentWeekDateData)
  
  const [slotsTypes, setSlotsTypes] = useState([]);
  const [isCurrentWeek, setIsCurrentWeek] = useState('');
  // Modal -set Week open/close Management
  const [show, setShow] = useState(false);
  const closeModal = () => setShow(false);
  const showModal = () => setShow(true);



  useEffect(() => {
    console.log("in the useEffect currentWeek", currentWeek);
    // RenderWeek();
    getSlotsTypesCategories();

    // Call the fetchUserCurrentWeek function and then renderWeek
  }, [dispatch]);


  useEffect(()=>{
    console.log("in the seconb use Effect here ");
    fetchUserCurrentWeek();
  },[currentWeek])



  const getSlotsTypesCategories = async () => {
    try {
      const response = await fetch(`http://localhost:5000/get_slots_types`);
      console.log(response);
      if (response.ok) {
        const data = await response.json()
        dispatch(setSlotTypesData(data.data))
      } else {
        console.log("Issue here planner line59");
      }
    }
    catch (e) {

    }

  };



  const fetchUserCurrentWeek = async () => {
    const week_number = currentWeek.currentWeekNumber;
    try {
      const user_id = userId;
      console.log("week Numberrrrrrr", week_number);
      const response = await fetch(`http://localhost:5000/get_user_current_week_data/${user_id}/${week_number}`);

      if (response.ok) {
        const data = await response.json();
          console.log("data to displacht ",data);
        dispatch(setUserCurrentWeekData(data));
       
      } else {
        console.log("no weeekly data yet ");
      }
    }
    catch (e) {
      console.log("error in fetching user weekly data");
    }


  };    


  



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





