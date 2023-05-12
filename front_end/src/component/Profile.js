import React from "react";
import WeeklySlots from "./planning/WeeklySlots";


const Profile = ({ isLoggedIn }) => {
  console.log("Profile component isLoggedIn: ", isLoggedIn);
  return (
    <div>
      <h1>Profile</h1>

    <WeeklySlots />
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