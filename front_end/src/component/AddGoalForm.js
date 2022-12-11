// import React, from "react";
import React from 'react';
import { Routes, Route, Link } from "react-router-dom";

import './styles.css'
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { format, parseISO } from "date-fns";
import Dropdown from 'react-bootstrap/Dropdown';
import DropdownButton from 'react-bootstrap/DropdownButton';

class AddGoalForm extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            goal_type_select: [],
            title: '',
            goal_type: '',
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
        console.log("on est monter sur le form");
        const getGoal_type = async () => {
            const { goal_type } = this.state.goal_type_select

            try {
                const results = await fetch('http://localhost:5000/api/goals_type/', {
                    methode: 'GET',
                    headers: {
                        'Content-Type': 'application/json',
                        body: JSON.stringify({ goal_type })
                    }
                });
                const data = await results.json()

                this.setState({ goal_type_select: data })
            }
            catch (e) {
                console.log(e);
            }
        }
        getGoal_type();
    
    const check_user_id = () => {
            const getuser = localStorage.getItem('isLoggin');
            console.log(getuser);
            if (getuser=== true) {
                const getUserId = getuser.split(',')[0]
                console.log("getUserId", getUserId);
                this.setState({user_id:getUserId})
            }
    } ;check_user_id()

    }
    handleChange = (e) => {
        e.preventDefault();
        if(e.target.name ==='goal_type' ){
          this.setState({goal_type:e.target.value})
        }else{

            this.setState({ [e.target.name]: e.target.value })
        }
        
    }

    handleSubmit = (e) => {
        e.preventDefault();
        // to make a feetch in a post>>>
        console.log(e.target);
        const add_goal_data = async () => {
            const { title, goal_type, start_date, end_date, accomplished, user_id, image_one, image_two, notes } = this.state
            console.log(JSON.stringify({ title, goal_type, start_date, end_date, accomplished, user_id, image_one, image_two, notes }));
            try {
                console.log("try harder");
                const results = await fetch(`http://localhost:5000/api/goals/`, {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ title, goal_type, start_date, end_date, accomplished, user_id:[this.user_id], image_one, image_two, notes })
                });
                console.log(results);
                const data = await results.json();
                console.log(data);
                this.setState({[e.target.name]: e.target.value})
            }

            catch (e) {
                console.log(e);
            }
        }
        add_goal_data()
        console.log(e.target.parentElement);
        e.target.reset()
        this.handleClose()

    }

    handleDate = (e) => {

        const dateFormatted = format(parseISO(e), "dd.MM.yyyy");
        console.log("date",this.start_date, this.end_date);
    }

    checkit=(e)=>{
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
                    <select name="goal_type" value={this.goal_type} onChange={this.handleChange}>
                        {
                            this.state.goal_type_select.map((item, index) => {
                              
                                return (
                                    
                                    <option key={item.id} value={index+1}>{item.name}</option>
                                )
                            })
                        }
                    </select>

                   
                    <DatePicker selected={this.state.start_date} name="select_start" format='yyyy-MM-dd' onChange={(e)=> {this.setState({start_date:e })}} onClick={this.handleDate} />
                    <DatePicker selected={this.state.end_date} name="select_End Date"  format='yyyy-MM-dd' onChange={(e)=> {this.setState({end_date:e })}} onClick={this.handleDate}  />

                    <input type="text" name="image_one" placeholder="url to image one" onChange={this.handleChange}/>
                    <input type="text" name="image_two" placeholder="url to image 2" onChange={this.handleChange}/>
                    <input type="text" name="notes" placeholder="notes"onChange={this.handleChange} />
                    Accomplished<input type="radio" name="accomplished" placeholder="accomplished"onChange={this.handleChange} />
                    <input type="submit" name="submit" placeholder="submit" />

                </form>


            </>

        )
    }
}

export default AddGoalForm