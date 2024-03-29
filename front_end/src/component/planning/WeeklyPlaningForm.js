import React, { useState } from "react";
import { useSelector } from "react-redux";
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { SlotsPlanningFormDetails } from "./SlotsPlanningFormDetails";
import '../../css/plannerStyles.css'


function WeeklyPlaningForm({ userId, currentWeek }) {
    // this is for the days checkbox form

    const user_id = userId;
    const globalSlotsTypes = useSelector(state => state.globalDataReducer.slotsTypes);
    const [weeklyFormData, setWeeklyFormData] = useState({ weekDaysChecked: [], hours_per_day: [] })
    // console.log("currentweeek", currentWeek.weekDates);
    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    const checkBoxDayInititalState= Array.from(currentWeek.weekDates , (day, index) =>({
        day: day['day_name'],
        isChecked : false,
        index:index, 
    })
    );
    const checkedBoxesInitialState = globalSlotsTypes.map((type) => {
        const current_week_number = currentWeek.currentWeekNumber;
        // console.log("cure week", current_week_number);
        const slot_type = type.slot_type_name;

        return (
            {
                "slot_type": slot_type,
                "current_week_number":current_week_number,
                "days_selected": {
                    checkBoxDayInititalState,
                    }
            }

        )

    });

  

    console.log("checkedBoxesInitialState", checkedBoxesInitialState);
    const [checkedBoxes, setCheckedBoxes] = useState(checkedBoxesInitialState);

    const handelTypeAndDayCheckBoxChange = (newCheckedDay) => {

        const day_name = newCheckedDay['name'];
        const slot_type_name = newCheckedDay['slot_type'];
        console.log("newCheckedDay", newCheckedDay);

        console.log("slot_type", slot_type_name);
        const updateCheckedBoxes = checkedBoxes.map((slot_type_checkbox, index) => {

            // console.log("slot",slot_type_checkbox, index);
            if (slot_type_checkbox === slot_type_name){

                console.log("Slot type ", slot_type_checkbox, slot_type_name);
            // }
            // if (day.day === day_name) {
            //     console.log("foudn it");
            //     return { ...checkedBoxes[day.day_name], day: day_name, isChecked: true, index: day.index }
            // }
            // return day;
        }})

        setCheckedBoxes(updateCheckedBoxes)
    }

    //     // {
    //     //     console.log("prevCheckedBoxesState",prevCheckedBoxesState);
    //     //     const findDayIndex = prevCheckedBoxesState.findIndex((day)=> day.day === day_name);
    //     //     console.log(findDayIndex);
    //     // })



    //     ({
    //         // const findDayIndex = prevCheckedBoxesState.findIndex((day)=> day.day === day_name),

    //         ...prevCheckedBoxesState,
    //         [day_name]: {...prevCheckedBoxesState[day_name], isChecked:true}
    //     }));

    //     setWeeklyFormData((prevWeeklyFormData) => ({
    //         ...prevWeeklyFormData,
    //         weekDaysChecked :[ ...prevWeeklyFormData.weekDaysChecked, newCheckedDay[checked]: true],
    // }));
    // };


    const setSlotTypeInputForm = globalSlotsTypes.map((slot_type, index) => {

        const select_slot_type = slot_type.slot_type_name;
        console.log("select_slot_type", slot_type);

        return (
            <div key={`slot_type${index}`} className=" slot_form_category">
                <h2>{slot_type.slot_type_name}</h2>
                <div className="input_week_checkbox">

                    <SlotsPlanningFormDetails slot_type_selected={slot_type.slot_type_name} currentWeek={currentWeek} handleData={handelTypeAndDayCheckBoxChange} />

                </div>

            </div>
        )
    }
    );


    const handleChange = (e) => {

        console.log("checkedBoxes", e.target);
    }


    const handleSubmit = (e) => {
        e.preventDefault();
        console.log(checkedBoxes);

    };



    return (

        <>
            <div className="planner_form_container">
                <Button class="btn btn-light" onClick={handleShow}>
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