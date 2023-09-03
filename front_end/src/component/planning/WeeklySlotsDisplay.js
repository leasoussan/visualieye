import React from "react";

const WeeklySlotsDisplay = ({current_week}) => {
    
    const fullDay = Array.from(Array(24), (_, index) => index);
    const formatZeroToClockString = (condition, number) => condition ? '0' + number : number  // makes 00 from 0

    const slots = fullDay.flatMap((hour) => {
        const minutes = [0, 20, 40]
        //   
        return minutes.map((pomedoro, index) => (
            <p key={`${hour}-${index}`} className="pomedoro_slots" >
                <span className="time_slots">{`${formatZeroToClockString(hour < 10, hour)}:${formatZeroToClockString(pomedoro === 0, pomedoro)}`} </span>
            </p>
        ))
    })

    // Display User Planing 

    
    
    //   
    return (
        <>
            <div className="slots">
                {slots}
            </div>
        </>
    )
};


export default WeeklySlotsDisplay