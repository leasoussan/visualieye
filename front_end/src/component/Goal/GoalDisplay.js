import React from "react";
import CheckUserLogIn from "../CheckUserLogIn.js";



const GoalDisplay=(props)=>{
    console.log(props);
    // const goal_id = props
    // const getdata = async()=>{
    //     const response = await fetch(`http://localhost:5000/api/goal_detail/${goal_id}`)
    //     const data = await response.json()
    //     console.log("we are herooo",data);
    
    // console.log(props);
    // };
    // getdata()

    return(
        <>
        <div className="goalDisplay">
        <div>HERE are MY  GOAL </div>
        </div>
        
        </>
    )
}
GoalDisplay()



export default GoalDisplay