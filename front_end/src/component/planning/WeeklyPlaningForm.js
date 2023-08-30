import React, { useState } from "react";
import { useSelector } from "react-redux";
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { SlotsPlanningFormDetails } from "./SlotsPlanningFormDetails";
import '../../css/plannerStyles.css'


function WeeklyPlaningForm({ userId , currentWeek}) {
  // this is for the days checkbox form
    
    const user_id = userId;
    const globalSlotsTypes = useSelector(state => state.globalDataReducer.slotsTypes);
    const [weeklyFormData , setWeeklyFormData] = useState({weekDaysChecked: [], hours_per_day:[]})
    console.log("currentweeek", typeof currentWeek.weekDates);
  
    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    const checkBoxInitialState= Array.from(currentWeek.weekDates , (day, index)=>({
        day: day['day_name'],
        isChecked : false,
        index:index, 
    }));

    console.log("checkBoxInitialState", checkBoxInitialState);
    const [checkedBoxes, setCheckedBoxes ] = useState(checkBoxInitialState);

    const handelCheckBoxChange = (newCheckedDay)=>{
    
        const day_name = newCheckedDay['name']
     
        setCheckedBoxes((prevCheckedBoxesState)=> {
            console.log("prevCheckedBoxesState",prevCheckedBoxesState);
            const findDayIndex = prevCheckedBoxesState.findIndex((day)=> day.day=== day_name);
            console.log(findDayIndex);
        })

        
        
        
        
        // ({
        //     ...prevCheckedBoxesState,
        //     [day_name]: {...prevCheckedBoxesState[day_name], isChecked:true}
        // }));

        setWeeklyFormData((prevWeeklyFormData) => ({
            ...prevWeeklyFormData,
            weekDaysChecked :[ ...prevWeeklyFormData.weekDaysChecked, newCheckedDay],
    }));
    };


    const setSlotTypeInputForm = globalSlotsTypes.map((slot_type, index)=>{

        return(
            <div key={`slot_type${index}`} className=" slot_form_category">
            <h2>{slot_type.slot_type_name}</h2>
            <div className="input_week_checkbox">
                 
            <SlotsPlanningFormDetails slot_type={slot_type} currentWeek={currentWeek} isChecked = {checkBoxInitialState.isChecked} handleData ={handelCheckBoxChange}/>

            </div>

            </div>
        )
    }
    );
    

    const handleChange=(e)=>{
        console.log("checkedBoxes", checkedBoxes);
       }
        

    const handleSubmit =(e)=>{
        e.preventDefault();
        console.log(checkedBoxes);

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

                       <form onSubmit={handleSubmit} onChange={handleChange}>


                        {setSlotTypeInputForm}
{/*  */}                    
                                <button type="submit">  send</button>
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