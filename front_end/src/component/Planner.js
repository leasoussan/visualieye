import React from "react";
import WeeklyPlanner from "./planning/WeeklyPlanner.js";


const Planner = ({ isLoggedIn }) => {

  const setPlanning =(e)=>{
    console.log("setting the plannig ");
  }


  console.log("profiler component isLoggedIn: ", isLoggedIn);
  return (
    <div className="plannerContainer">
<<<<<<< HEAD
      <h1>profiler</h1>

<<<<<<< HEAD
    <button onClick={setPlanning}> Set Weekly Planning</button>
=======
    <button className="w-1/6 h-9 rounded-full bg-[#ffc93c] hover:bg-[#ffc93c]/80"onClick={setPlanning}> Set Weekly Planning</button>
>>>>>>> 25d5fcfacb8c98e84ee54e27a556dd8d1960c83e
=======
      <h1>Profiler</h1>

    <button className="w-1/6 h-9 rounded-full bg-[#ffc93c] hover:bg-[#ffc93c]/80"onClick={setPlanning}> Set Weekly Planning</button>
>>>>>>> d0c80186e68e72fc476a0c695de2461189eae4b5

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