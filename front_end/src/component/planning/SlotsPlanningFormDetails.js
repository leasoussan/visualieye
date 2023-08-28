import React from "react";
import '../../css/plannerStyles.css'


export const SlotsPlanningFormDetails = ({ slot_type, currentWeek }) => {

    
    const displayWeekDays = Object.entries(currentWeek['weekDates']).map(([index, value]) => {

        return (
            <div key={index} className="category_form_container">
                <label>{value.day_name}</label>
                <input type="checkbox" value={value.day_date} />
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