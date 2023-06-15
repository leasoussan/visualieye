import React from "react";
import WeeklyPlanner from "./planning/WeeklyPlanner.js";


const Profile = ({ isLoggedIn }) => {

  const setPlanning =(e)=>{
    console.log("setting the plannig ");
  }


  console.log("Profile component isLoggedIn: ", isLoggedIn);
  return (
    <div>
      <h1>Profile</h1>

    <button onClick={setPlanning}> Set Weekly Planning</button>

    <WeeklyPlanner />
    </div>
  );
};

export default Profile;







// class Profile extends React.Component {
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
// export default Profile