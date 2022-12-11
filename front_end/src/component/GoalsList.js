import React from "react";
import AddGoalForm from "./AddGoalForm";
import { Routes, Route, Link } from "react-router-dom";
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { CheckUserLogIn } from "./CheckUserLogIn";
import NavBar from "./NavBar";

class GoalsList extends React.Component {
    constructor() {
        super();
        this.state = {
            goals: [],
            user_id: '',
            goal_type: [],
            show: false,
            username: '',

        }
    }

    componentDidMount() {
        const fetch_user_id = () => {
            const getuser = localStorage.getItem('isLoggin');
            if (getuser) {
                const getUserId = getuser.split(',')[0]
                return getUserId
            }
            else {
                return 0
            }


        };

        const setGoalsType = async () => {
            console.log("ici");
            try {
                const response = await fetch(`http://localhost:5000/api/goals_type`);
                const data = await response.json();
                this.setState({ goal_type: data })
                // console.log(data);

            }
            catch (e) {
                console.log(e);
            }
        }
        setGoalsType()

        const get_user_goal = async () => {
            this.setState({ user_goals: [] })
            const userId = fetch_user_id()
            console.log(userId);
            try {
                const response = await fetch(`http://localhost:5000/api/my_goals/${userId}`);
                const data = await response.json();
                this.setState({ goals: data })

            }


            catch (e) {
                console.log(e);
            }
        }; get_user_goal()

    }


    handleShow = (e) => {
        this.setState({ show: true })
    }

    handleClose = (e) => {
        this.setState({ show: false })
    }

    showModalAddGoal = () => {
        const usersGoals = this.state.goals;
        const goals_type = this.state.goal_type;
        console.log(usersGoals);


        for (const goal of goals_type) {
            console.log(goal);
            if (goal in goals_type) {
                return (

                    <> {goal}</>
                )
            } else {
                return (
                    <>
                        <div>
                            <Button variant="primary" onClick={this.handleShow}>
                                Launch static backdrop modal
                            </Button>
                            <Modal
                                show={this.state.show}
                                onHide={this.handleClose}
                                backdrop="static"
                                keyboard={false}
                            >
                                <Modal.Header closeButton>
                                    <Modal.Title>Modal title</Modal.Title>
                                </Modal.Header>
                                <Modal.Body>

                                    <AddGoalForm />

                                </Modal.Body>
                                <Modal.Footer>
                                    <Button variant="secondary" onClick={this.handleClose}>
                                        Close
                                    </Button>
                                    <Button variant="primary">Understood</Button>
                                </Modal.Footer>
                            </Modal>

                        </div>

                    </>
                )
            }
        }
    }


    render() {

        return (
            <>


                <CheckUserLogIn />
                <Link to='/login' id='go_to_login' />

                <div className="display_manager" >


                    {
                        this.state.goal_type.map((item) => {
                            return (

                                <>
                                    <div key={item.id} className="goal_diplay_board">
                                        {item.id} {item.title}
                                        <div>

                                            {this.showModalAddGoal()}



                                        </div>


                                    </div>

                                </>
                            )
                        })
                    }

                </div>
            </>
        );
    }
}
export default GoalsList;


