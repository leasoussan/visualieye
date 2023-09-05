import React, { useState, useEffect } from "react";
import { useParams } from 'react-router-dom'
import CheckUserLogIn from "../CheckUserLogIn.js";
import EditGoalForm from "./EditGoalForm";
import Button from "react-bootstrap/esm/Button";
import Modal from 'react-bootstrap/Modal';
import './goalStyles.css'


function GoalDisplay(props) {
    const { goal_id } = useParams();
    const [goalData, setGoalData] = useState([]);
    const [error, setError] = useState('');
    const [show, setShow] = useState(false);

    const handleClose = () => {
        setShow(false);

    }
    const handleShow = () => {
        setShow(true);
    }

    const getdata = async (req, res) => {
        try {
            const response = await fetch(`http://localhost:5000/goal_detail/${goal_id}`)
            if (response.length === 0) {
                alert('there isnt a goal yet')
            }
            else {
                const data = await response.json()

                setGoalData(data[0])
            }


        }
        catch (e) {
            console.log("in the error of Goal Display");
            setError({ "getDataError": e.msg })
        }

    };


    useEffect(() => {
        getdata();
    }, [])


    const handleRefresh = () => {
        getdata();
    }

    return (
        <>
        <style type='text/css'>
      {`
      h1 {
        0.7
      }
      .btn-warning {
        --bs-btn-hover-bg: #e9ff4e;
        }
      a {
        text-decoration: none;
        color: inherit; 
      }
      a:hover {
        color: black;
      }`}
    </style>
            <div className="goal_container mt-5 mb-5">
                <div className="goal_header rounded bg-light">
                    {show && (
                        <EditGoalForm closeModal={handleClose} goal_data={goalData} onRefresh={handleRefresh} />
                    )}

                    <h1 className="mt-5">{goalData?.title ? goalData.title : "What is your Next Goal"}</h1>
                    {/* <h1>{goalData.title && goalData.title }</h1> */}
                    <h3 className="mt-5">On the :</h3>
                    <h3>{goalData?.end_date ? goalData.end_date : "When Did it Happened"}</h3>
                        <Button className="mt-3 mb-3" variant="warning" onClick={handleShow}>Edit</Button>
                </div>
            </div>

        </>
    )
}



export default GoalDisplay

