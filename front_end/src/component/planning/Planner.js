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
// - user want to be able to see what time is left to be planed - empty spots 
//  - user wants to be able visualized past week, and understand paterns and success
// - users want to be able to visualize next week - but wont be able to save neither past week and future week


const Planner = ({ isLoggedIn, userId }) => {
  const dispatch = useDispatch();
  
  const current_week = useSelector((state) => state.globalDataReducer.currentWeekDateData)
  console.log("the current week from the store ", current_week);
  const [slotsTypes, setSlotsTypes] = useState([]);
  const [isCurrentWeek, setIsCurrentWeek] = useState('');
  // Modal -set Week open/close Management
  const [show, setShow] = useState(false);
  const closeModal = () => setShow(false);
  const showModal = () => setShow(true);

  
 
  useEffect(() => {
    // RenderWeek();
    
    getSlotsTypesCategories();

    // Call the fetchUserCurrentWeek function and then renderWeek
  }, [dispatch]);


  useEffect(()=>{
    fetchUserCurrentWeek();
    // return () => {
    // };
  },[])



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
    const week_number = current_week.currentWeekNumber;
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

    <div className="planner_container">
      <WeeklyPlanningForm currentWeek={current_week}  userId={userId} showModal={showModal} closeModal={closeModal} />  
      <div className="flex flex-row">
      <button className="btn btn-light mr-1">PAST WEEK </button>
      <button className="btn btn-light ml-1">NEXT WEEK  </button>
      </div>
      <WeeklyPlannerDisplay currentWeek={current_week} slotsTypes={slotsTypes} userId={userId} />
    </div>
  );
};

export default Planner;





