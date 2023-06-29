import React, {useState, useEffect} from "react";
import './GoalStyles.css';
import { useParams} from 'react-router-dom'
import CheckUserLogIn from "../CheckUserLogIn.js";


function GoalDisplay (props){
    const { goal_id } = useParams();
    const [goalData, setGoalData ] = useState('');


    useEffect(()=>{
        const getdata = async(req,res)=>{
            try{
                 
                const response = await fetch(`http://localhost:5000/goal_detail/${goal_id}`)
                const data = await response.json()
                setGoalData(data[0])
            }
            catch(e){
                console.log("in the error of Goal Display");
            }
            
        };
        getdata();
    },[])

    return(
        <>
        <div className="goalDisplay">
        <div>HERE are MY  GOAL  </div>
        <p>Goal Title</p>
        <h1>{goalData.title}</h1>
        <h1>{goalData.end_date}</h1>
        </div>
        
        </>
    )
}



export default GoalDisplay