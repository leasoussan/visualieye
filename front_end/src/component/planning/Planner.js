import React, {useState, useEffect} from "react";
import WeeklyPlannerDisplay from "./WeeklyPlannerDisplay.js";


const Planner = ({ isLoggedIn, userId }) => {
  const [slotsTypes, setSlotsTypes] = useState([]);
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

  const getCategories= async ()=>{

    try{
        const response = await fetch(`http://localhost:5000/get_slots_types`, {
            method: 'GET',
            headers:{
                'Content-Type' : 'application/json',
            },
            body: JSON.stringify({})
        });

        if (response.ok){
            const data = await response.json
            console.log(data);
        }else{
            console.log("Issue here planner line 24");
        }
    }
    catch(e){

    }
       
};
getCategories();


  const setPlanning =(e)=>{
    console.log("setting the plannig ");
  }
  
  return (
    <div>
      <h1>PLANNER</h1>

    <button onClick={setPlanning}> Set Weekly Planning</button>

    <button >PAST WEEK </button>
    <button >NEXT WEEK  </button>
    <WeeklyPlannerDisplay slotsTypes={slotsTypes} userId={userId}/>
    </div>
  );
};

export default Planner;





