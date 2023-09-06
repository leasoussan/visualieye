import React from 'react';
import { Routes, Route, Link } from "react-router-dom";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { format, parseISO } from "date-fns";
import Dropdown from 'react-bootstrap/Dropdown';
import DropdownButton from 'react-bootstrap/DropdownButton';
import { CheckUserLogIn } from "../CheckUserLogIn.js";
import { Button } from 'bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCalendarDays } from '@fortawesome/free-solid-svg-icons'


class AddGoalForm extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            goal_type_select: '',
            goal_type_name: '',
            title: '',
            starting_date: new Date(),
            end_date: '',
            user_id: props.userId,
            // set_order: ''
        }
    }
    componentDidMount() {
        console.log(this.props);
        this.setState({
            goal_type_select: this.props.goalType['id'],
            goal_type_name: this.props.goalType['name'],
        });
    //     switch (this.props.goalType.name) {
    //         case 'main':
    //             this.setState({ set_order:'main' }, () => console.log(this.state.set_order));
    //             break;
    //         case 'planner':
    //             this.setState({ set_order: 'planner' }, () => console.log(this.state.set_order));
    //             break;
    //         case 'health':
    //             this.setState({ set_order: 'health' }, () => console.log(this.state.set_order));
    //             break;
    //         case 'wealth':
    //             this.setState({ set_order: 'wealth' }, () => console.log(this.state.set_order));
    //             break;
    //         default:
    //             break;

    // }
    };

    componentDidUpdate(prevProps) {
        // TODO# refresh page after elemench changed -saved goal
        // window.location.reload(false).
        
    };

    handleChange = (e) => {
        this.setState({ [e.target.name]: e.target.value })
    }

    handleSubmit = (e) => {
        e.preventDefault();
        console.log("this State", this.state);

        const add_goal_data = async () => {
            const {
                user_id,
                title,
                goal_type_select,
                starting_date,
                end_date,
                // set_order 
            } = this.state;

            try {
                const results = await fetch(`http://localhost:5000/add_goal`, {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({
                        user_id,
                        title,
                        goal_type: goal_type_select,
                        starting_date,
                        end_date,
                        accomplished: false,
                        // goal_order:set_order,
                    })
                });
                const data = await results.json();
                console.log("data", data);
            } catch (e) {
                console.log(e);
            }
        }
        add_goal_data();
       
        e.target.reset();
        this.props.close();

    }

    handleDate = (e) => {
        const dateFormatted = format(parseISO(e), "dd.MM.yyyy");
        console.log("eventDate", e);
        console.log("dateFormateds", dateFormatted);
    }
    handleClose = () => {
        this.props.close()
    }

    render() {
        // const {start_date_selector} = new Date();
        return (
            <>
            <style type='text/css'>
                {`.react-datepicker__input-container {
                    width: 100%;
                }
                .react-datepicker-wrapper {
                    display: flex;
                    justify-content: end;
                    width: 55%;
                    }
                .form-control {
                    height: 3vh;
                }
                p {
                    margin-bottom: 0;
                }
                } `}
            </style>
                <form className="form_holder" onSubmit={this.handleSubmit}>
                    <div className="mb-5 mt-5 row d-flex align-items-center">
                        <label className="col">{`Your ${this.state.goal_type_name} Goal`}</label>
                        <input className='form-control col mr-3' type="title" name="title" placeholder="title" onChange={this.handleChange} />
                    </div>
                    <div className="mb-5">
                        <div className='row d-flex align-items-end'>
                            <p className='col d-flex justify-content-start align-items-end mr-5'>Goal Date<FontAwesomeIcon className="calendar_icon ml-5" icon={faCalendarDays} /></p>
                            <DatePicker className="date_picker form-control rounded col pl-2 " selected={this.state.end_date} name="select_end_date" dateFormat='yyyy-MM-dd' onChange={(e) => { this.setState({ end_date: e }) }}/>
                        </div>
                    </div>
                    <div className='flex justify-center'>
                        <button className="w-1/2 h-9 rounded-full bg-[#ffc93c] hover:bg-[#ffc93c]/80">
                            <input type="submit" name="submit" placeholder="submit" />
                        </button>
                    </div>
                </form>
            </>
        )
    }
}

export default AddGoalForm



const comp = ()=>{





}


