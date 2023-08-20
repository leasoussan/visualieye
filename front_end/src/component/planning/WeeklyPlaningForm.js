import React, { useState } from "react";
import { useSelector } from "react-redux";
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';


function WeeklyPlaningForm({ userId , currentWeek}) {

    const user_id = userId;
    console.log("current week ", currentWeek);
    const globalSlotsTypes = useSelector(state => state.globalDataReducer.slotsTypes).data;
  
    console.log("slots_type", globalSlotsTypes);
    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);


    const setSlotTypeInputForm = globalSlotsTypes.map((slot_type, index)=>{

        console.log(globalSlotsTypes, index);
        return(
            <div key={index} className="slot_form_category">
            <h2>{slot_type.slot_type_name}</h2>

            

            </div>
        )
    }
    );
    
    
   
    

    const handleSubmit =()=>{

    };



    return (

        <>
            <div className="planner_form_container">
                <Button variant="primary" onClick={handleShow}>
                    SET YOUR WEEK 
                </Button>

                <Modal
                    show={show}
                    onHide={handleClose}
                    backdrop="static"
                    keyboard={false}
                >
                    <Modal.Header closeButton>
                        {/* <Modal.Title> Weekly Planner From TO to {currentWeek[0].day} {currentWeek[0].value}   to  {currentWeek[currentWeek.length -1].day} {currentWeek[currentWeek.length -1].value} </Modal.Title> */}
                        <Modal.Title> Weekly Planner From TO to  </Modal.Title>
                    </Modal.Header>
                    <Modal.Body>

                       <form onSubmit={handleSubmit}>


                        {setSlotTypeInputForm}
{/*  */}
                       </form>



                    </Modal.Body>
                    <Modal.Footer>
                        <Button variant="secondary" onClick={handleClose}>
                            Close
                        </Button>
                        <Button variant="primary">Understood</Button>
                    </Modal.Footer>
                </Modal>


        </div >
        </>
    )




};

export default WeeklyPlaningForm 