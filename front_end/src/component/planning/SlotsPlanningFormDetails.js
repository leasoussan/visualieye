import React from "react";
import './planning.css'


export const SlotsPlanningFormDetails = ({ slot_type, currentWeek }) => {

    const displayWeekDays = Object.entries(currentWeek['weekDates']).map(([index, value]) => {


        return (
            <div key={index} className="category_form_container">
                <label>{value.day.slice(0, 3)} {value.value}</label>
                <input type="checkbox" value={value.value} />
            </div>

        )
    }


    )
    return (
        <>
            <label> Days  </label>


            {/* <input type="checkbox" />     */}
            {displayWeekDays}

        </>

    )

};