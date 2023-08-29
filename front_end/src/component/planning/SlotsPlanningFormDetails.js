import React, { useState } from "react";
import '../../css/plannerStyles.css'


export const SlotsPlanningFormDetails = ({ slot_type, currentWeek , isChecked, setIsChecked, }) => {

    const handelCheckBoxChange =(e)=>{
        console.log("handle Checkbox Change",e.target);
        setIsChecked((prevIsChecked) =>   !prevIsChecked)
    }


    const handelHoursChanges =(e)=>{
        console.log(e.target);
    }


    const displayWeekDays = Object.entries(currentWeek['weekDates']).map(([index, value]) => {
        console.log("index here", index, value);

        const displayHoursInput = (index)=>{
            console.log("index here", index);
            return(
                <div key={`hours_key_index${index}`}>
                    <labl>FROM:</labl>
                    <input 
                    type="time" 
                    name="day_slot_start_time" 
                    onChange={handelHoursChanges}
                    ></input>
                    <labl>TO:</labl>
                    <input type="time" name="day_slot_end_time"></input>
                </div>
            )
    
        }
       
        return (
            <>
           
            <div key={`day_key_index${index}`} id={slot_type.slot_type_name} className="category_form_container">
                <label>{value.day_name}</label>
                <input 
                type="checkbox" 
                value={value.day_date} 
                name={value.day_name}
                checked ={isChecked}
                onChange={handelCheckBoxChange}
                />

            </div>
            <div>
            {displayHoursInput(value.day_name)}
            </div>
            </>
        );
    });

    


    
    return (
        <>
            <label> Days  </label>


            <input type="checkbox" />    
            {displayWeekDays}
             

        </>

    )

};