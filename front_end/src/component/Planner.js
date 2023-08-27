import React from "react";
import WeeklyPlanner from "./planning/WeeklyPlanner.js";


const Planner = ({ isLoggedIn }) => {

  const setPlanning =(e)=>{
    console.log("setting the plannig ");
  }


  console.log("profiler component isLoggedIn: ", isLoggedIn);
  return (
    <div className="plannerContainer">
      <h1>profiler</h1>

    <button onClick={setPlanning}> Set Weekly Planning</button>

    <WeeklyPlanner />
    </div>
  );
};

export default Planner;







// class profiler extends React.Component {
//     constructor() {
//         super();
//         this.state = {

//         }
//     }

//     componentDidMount() {
//         // const getusername = () => {
//         //         const getuser = localStorage.getItem('isLoggin');
//         //         if (getuser) {
//         //             const getUserId = getuser.split(',')[1]
//         //             this.setState({username:getUserId})
//         //         }
//         //         else {
//         //             return 0
//         //         }
        
//         //     };getusername()
        

//     }




//     render() {


//         return (

//             <>


//                 <h1> About me here {this.state.username}</h1>

//                 <h2> Affiramtion 1 </h2>
//                 <h2> Affiramtion 2 </h2>
                
//             </>
//         )
//     }
// }
// export default profiler