import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import './goalStyles.css'
import { Link } from "react-router-dom";
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import NavBar from "../NavBar";
import GoalDisplay from "./GoalDisplay";
import AddGoalForm from "./AddGoalForm";
import ModalForm from "./ModalForm.js";


function Profiler({isLoggedIn}) {
  const current_week = useSelector((state) => state)
  
console.log("profiler current_week", current_week);
  const [goals, setGoals] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [goalTypes, setGoalTypes] = useState([]);
  const [userId, setUserId] = useState(0);
  const [selected_goal_type, setSelectedGoalType] = useState(0);
  
  const ToggleModal = ()=> setShowModal(!showModal);

  useEffect(() => {
    
    const fetchUserGoals = async () => {
      const getuser = localStorage.getItem('user_id');

      if (getuser !== null) {

        setUserId(getuser);
        try {
          console.log("userId", getuser);

          const response = await fetch(`http://localhost:5000/profiler/${getuser}`);
          const data = await response.json();
          if (data.msg === "null") {
            console.log("User has no goals.");
          } else {
            setGoals(data);
          }
        } catch (e) {
          console.log(e);
        }
      }
    };

    const fetchGoalTypes = async () => {
      try {
        const response = await fetch(`http://localhost:5000/goal_type`);
        const data = await response.json();
        setGoalTypes(data);
      } catch (e) {
        console.log(e);
      }

    };

    fetchUserGoals();
    fetchGoalTypes();
  }, [userId]);

  const handleShowModal = (goal_type) => {
    console.log(goal_type);
    setShowModal(true);
    setSelectedGoalType(goal_type)
  };


  return (
    <>

      <div className="display_manager">
       
        {goalTypes.map((goalType) => {
          
          const currentGoal = goals.find((goal) => goal.goal_type === goalType.id);
          console.log(currentGoal);
          return (
            <div key={goalType.id} className={'goal_box'}>
              <h1 style={{ color: 'green' }}>{goalType.name.toUpperCase()}</h1>
              {currentGoal ? (
                <div>
                  <h1 style={{ width: '90%' }}> {currentGoal.title.toUpperCase()}</h1>
                  <p>Status: {currentGoal.accomplished}</p>

                  <Link to={`/goal/${currentGoal.goal_id}` } >Goal</Link>
                </div>
              ) : (
                <div>

                  <Button variant="primary" onClick={()=> handleShowModal(goalType)}>
                    ADD YOUR {goalType.name} Goal
                  </Button>
                 <ModalForm show={showModal} close={ToggleModal} goalType={selected_goal_type} user_id={userId}/>
                </div>
              )}
            </div>
          )
        })}
      </div>
    </>
  );
}

export default Profiler;
