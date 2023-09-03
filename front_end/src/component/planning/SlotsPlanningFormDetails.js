import React, { useState } from "react";
import '../../css/plannerStyles.css'


// export const SlotsPlanningFormDetails = ({ slot_type, currentWeek , isChecked, setIsChecked, }) => {
    export const SlotsPlanningFormDetails = ({slot_type_selected ,currentWeek, handleData }) => {
        console.log( "currentWeek",currentWeek);
        console.log("slot_type_selected" ,slot_type_selected);


    const handelCheckBoxChange =(e)=>{
        
        const {name , checked, value, slot_type } = e.target;
        console.log(e.target );
        if (checked){ 
        const day_checkBox_data = {name , checked, value,slot_type};
        handleData(day_checkBox_data);
            
        }
        const slot_week_days = currentWeek.weekDates;

        console.log(slot_week_days);
    }


    const handelHoursChanges =(e)=>{
        console.log(e.target);
    }


    const displayWeekDays = Object.entries(currentWeek['weekDates']).map(([index, day]) => {
        // console.log("in the loop log of index", index);
        // console.log("in the loop log of day_name and day value", da);

        const displayHoursInput = (dayName)=>{
            return(
                <div key={`hours${dayName}`}>
                    <label>FROM:</label>
                    <input 
                    type="time" 
                    name="day_slot_start_time" 
                    onChange={handelHoursChanges}
                    ></input>
                    <label>TO:</label>
                    <input type="time" name="day_slot_end_time"></input>
                </div>
                // <>
                // </>
            )
    
        };
        const curr_week_number = currentWeek.currentWeekNumber
        const createUniqueKey =()=>{
            
            const key = `${curr_week_number}/${slot_type_selected}/${day.day_name}`
            return key
        }
        return (
            <>
           
            <div key={createUniqueKey()} className={`category_form_container_slot/${slot_type_selected}`}>
                <label>{day.day_name}</label>
                <input 
                slot_type={slot_type_selected}
                type="checkbox"
                value={day.day_date} 
                name={day.day_name}
                // checked ={isChecked}
                onChange={handelCheckBoxChange}
                />

            </div>
            <div>
            {displayHoursInput(day.day_name)}
            </div>
            </>
        );
    });

    


    
    return (
        <div>
            <label> Days  </label>


            {displayWeekDays}
             

        </div>

    )

};