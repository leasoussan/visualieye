import React from "react";

const WeeklySlotsDisplay = () => {
    const fullDay = Array.from(Array(24), (_, index) => index + 1);
    //   
    const slots = fullDay.flatMap((hour) => {
        const minutes = [0, 20, 40]
        //   
        return minutes.map((pomedoro, index) => (
            <p key={`${hour}-${index}`} className="pomedoro_slots">
                <span>{`${hour}:${pomedoro}`} </span>
            </p>
        ))
    })
    //   
    //   
    //   
    //   
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