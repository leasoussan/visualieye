import React from "react";
import GoalsList from "./GoalsList";
import { Link } from "react-router-dom";
import { CheckUserLogIn } from "./CheckUserLogIn";
import NavBar from "./NavBar";

class VisionsBoard extends React.Component {
    constructor() {
        super();
        this.state = {
            my_goals: []
        }

    }

    // componentDidMount() {
    //     console.log("welcome");
    //     const getMyGoals = async () => {
    //         const results = await fetch('http://localhost:5000/api/goals')
    //         const data = await results.json()
    //         this.setState({ my_goals: data })
    //     }

    //     getMyGoals()
    //     CheckUserLogIn()
    // }


    render() {
        return (
            <>        
            <CheckUserLogIn/>  
  
            <Link to='/login' id='go_to_login'/>
            {/* <div>
                {
                    this.state.my_goals.map((item) => {
                        return (
                            <div>
                                here {item.image_one}
                                2{this.image_two}
                            </div>

                        )
                    })
                }
            </div> */}
            </>


        )
    }
}


// const VisionsBoard =(props)=>{
//     const visionBoardGoals = props

//     const getMyGoals = async(props)=>{
//         console.log(props);
//         const results = await fetch('http://localhost:5000/api/goals')
//         const data = await results.json()
//         console.log(data);
//     }

//     getMyGoals()

//     // console.log(data);


//     return(
//         <>
//         <div>
//             {/* {
//             this.props.map(item=> console.log(item))
//             }
//             <h1> Hola</h1> */}


//         </div>


//         </>
//     )
// }

export default VisionsBoard