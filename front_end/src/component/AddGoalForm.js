// import React, from "react";
import React from 'react';
import { Routes, Route, Link } from "react-router-dom";

import './styles.css'
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { format, parseISO } from "date-fns";
import Dropdown from 'react-bootstrap/Dropdown';
import DropdownButton from 'react-bootstrap/DropdownButton';
import { CheckUserLogIn } from "./CheckUserLogIn.js";



class AddGoalForm extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            goal_type_select: [],
            title: '',
            goal_type: props.goal_type,
            start_date: new Date(),
            end_date: new Date(),
            accomplished: false,
            user_id: '',
            image_one: '',
            image_two: '',
            notes: ''
        }
    }

    componentDidMount(e) {

        // ______________________________________________________________________in case I want the user to be able to choose
        // const getGoal_type = async () => {
        //     const { goal_type } = this.state.goal_type_select

        //     try {
        //         const results = await fetch('http://localhost:5000/api/goals_type/', {
        //             methode: 'GET',
        //             headers: {
        //                 'Content-Type': 'application/json',
        //                 body: JSON.stringify({ goal_type })
        //             }
        //         });
        //         const data = await results.json()
        //         this.setState({ goal_type_select: data })
        //     }
        //     catch (e) {
        //         console.log(e);
        //     }
        // }
        // getGoal_type();



    }
    handleChange = (e) => {
        e.preventDefault();
        if (e.target.name === 'goal_type') {
            this.setState({ goal_type: e.target.value })
        } else {

            this.setState({ [e.target.name]: e.target.value })
        }

    }

    handleSubmit = (e) => {
        e.preventDefault();
        // to make a feetch in a post>>>
        console.log(e.target);
        const add_goal_data = async () => {
            const {
                goal_id,
                user_id,
                title,
                goal_type,
                starting_date,
                end_date,
                goal_status,
                goal_order } = this.state;

            console.log("icii conas", this.state)
            console.log(JSON.stringify({
                goal_id,
                user_id,
                title,
                goal_type,
                starting_date,
                end_date,
                goal_status,
                goal_order
            }));
            try {
                const results = await fetch(`http://localhost:5000/api/goal/`, {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ goal_id,
                        user_id,
                        title,
                        goal_type,
                        starting_date,
                        end_date,
                        goal_status,
                        goal_order  })
                });
                console.log(results);
                const data = await results.json();
                console.log("data", data);
                // this.setState({[e.target.name]: e.target.value})
            }

            catch (e) {
                console.log(e);
            }
        }
        add_goal_data()
        console.log(e.target.parentElement);
        e.target.reset()
        // this.handleClose()

    }

    handleDate = (e) => {

        const dateFormatted = format(parseISO(e), "dd.MM.yyyy");
        console.log("date", this.start_date, this.end_date);
    }

    checkit = (e) => {
        console.log(e);
    }

    render() {
        // const {goal_type_select} = this.state.goal_type

        // const {start_date_selector} = new Date();
        return (
            <>
                <form className="form_holder" onSubmit={this.handleSubmit}>
                    <label>TITLE</label>
                    <input type="title" name="title" placeholder="title" onChange={this.handleChange} />
                    <label>Goal Type</label>
                    {/* <select name="goal_type" value={this.goal_type} onChange={this.handleChange}>
                        {
                            this.state.goal_type_select.map((item, index) => {

                                return (

                                    <option key={item.id} value={index + 1}>{item.name}</option>
                                )
                            })
                        }
                    </select> */}


                    <DatePicker selected={this.state.start_date} name="select_start_date" format='yyyy-MM-dd' onChange={(e) => { this.setState({ start_date: e }) }} onClick={this.handleDate} />
                    <DatePicker selected={this.state.end_date} name="select_end_date" format='yyyy-MM-dd' onChange={(e) => { this.setState({ end_date: e }) }} onClick={this.handleDate} />


                    <input type="select" name="goal_order" placeholder="goal_order" onChange={this.handleChange} />
                    <input type="submit" name="submit" placeholder="submit" />

                </form>
            
            </>

        )
    }
}

export default AddGoalForm