import React from "react";
import AddGoalForm from "./AddGoalForm";
import { Routes, Route, Link } from "react-router-dom";
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import CheckUserLogIn from "./CheckUserLogIn.js";
import NavBar from "./NavBar";
import GoalDisplay from "./GoalDisplay";



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
            const userId = fetch_user_id()

            try {
                const response = await fetch(`http://localhost:5000/api/my_goals/${userId}`);
                const data = await response.json();
                console.log(data);
                if (data.msg === "null") {

                    this.setState({ goals: this.state.goal_type })

                } else {
                    this.checkUserGoals(data)
                }

            }

            catch (e) {
                console.log(e);
            }
        }; get_user_goal()


    }

    checkUserGoals = (props) => {
        const getTypes = this.state.goal_type
        const exisitingGoals = []
        for (const goal of props) {
            const isExisist = (obj) => {
                console.log(obj);
                return obj => obj.name === goal.name;
            }
            const results = props.find(isExisist(goal))

            exisitingGoals.push(goal)
            console.log(exisitingGoals);
        };
        this.setState({ goals: exisitingGoals });
    }



    handleShow = (e) => {
        this.setState({ show: true })
    }

    handleClose = (e) => {
        this.setState({ show: false })
    }

    

    render() {

        const goals = this.state.goals
        console.log(goals);
        const goal_type = this.state.goal_type

        return (
            <>

                <div className="display_manager" >

                    {
                        goal_type.map((item, i) => {
                            const getCurrentGoal = goals.find((obj) => obj.goal_type === item.id)
                            return (
                                <div key={item.name} className={'goal_box'}>
                                    <h1 style={{color:'green'}}>{item.name.toUpperCase()}</h1>
                                    {
                                        getCurrentGoal ?
                                            <div>
                                               <h1 style={{width:'90%'}}> {getCurrentGoal.title.toUpperCase()}</h1> 
                                            Started on: <p>{getCurrentGoal.start_date.slice(0,10)}</p>
                                            Accomplished on:<p>{getCurrentGoal.end_date.slice(0,10)}</p>
                                            Status <p>{getCurrentGoal.accomplished}</p>                                            
                                            <p>{getCurrentGoal.goal_id}</p>
                                                <Link to={`/a_goal/${getCurrentGoal.goal_id}`} props={getCurrentGoal.goal_id}>Goal</Link>
                                            </div>
                                            :
                                            <div>
                                                <Button variant="primary" onClick={this.handleShow}>
ADD YOUR {item.name} Goal                                                </Button>
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
                                                        <AddGoalForm goal_type={item.id}/>
                                                    </Modal.Body>
                                                    <Modal.Footer>
                                                        <Button variant="secondary" onClick={this.handleClose}>
                                                            Close
                                                        </Button>
                                                        <Button variant="primary">Understood</Button>
                                                    </Modal.Footer>
                                                </Modal>
                                            </div>
                                    }



                                </div>
                            )


                        })

                    }


                </div>

            </>

        )
    }
}









export default GoalsList;


// goals.forEach(obj => {
//     if (obj.name === item.name) {
//         return (
//             <div key={i} className='goal_box'>
//                 <h1>{obj}</h1>
//             </div>
//         )
//     } else {
//         return (
//             <div>
//                 <Button variant="primary" onClick={this.handleShow}>
//                     Launch static backdrop modal
//                 </Button>
//                 <Modal
//                     show={this.state.show}
//                     onHide={this.handleClose}
//                     backdrop="static"
//                     keyboard={false}
//                 >
//                     <Modal.Header closeButton>
//                         <Modal.Title>Modal title</Modal.Title>
//                     </Modal.Header>
//                     <Modal.Body>
//                         <AddGoalForm />
//                     </Modal.Body>
//                     <Modal.Footer>
//                         <Button variant="secondary" onClick={this.handleClose}>
//                             Close
//                         </Button>
//                         <Button variant="primary">Understood</Button>
//                     </Modal.Footer>
//                 </Modal>
//             </div>
//         )
//     };
// })