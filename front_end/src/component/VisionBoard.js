import React, {useState}from "react";
import AddGoalForm from "./AddGoalForm";

const VisionBoard = ({ isLoggedIn }) => {
    const [goalsList, setGoalsList] = useState([])
    const user_id = localStorage.getItem('user_id');

    // const get_user_goal = async () => {
    //         console.log(user_id);
    //         try {
    //             const response = await fetch(`http://localhost:5000/api/vision_board/${user_id}`);
    //             const data = await response.json();
    //             console.log("goals", data);
    //             if (data.msg === "null") {
    //                 setGoalsList({ goals: {"msg":"nothingyet"}});
    //                 // <AddGoalForm  user_id={user_id} />
    //             } else {
    //                 setGoalsList({goals: data})
    //             }
    
    //         }
    
    //         catch (e) {
    //             console.log(e);
    //         }
    //     }
    
            
  return (
    <div>
      <h1>VisionBoard YO</h1>
    </div>
  );
};

export default VisionBoard;




// class VisionsBoard extends React.Component {
//     constructor(props) {
//         super(props);
//         this.state = {
//             goals: [],
//             user_id: "",
//             defaultImg: 'https://www.rd.com/wp-content/uploads/2019/06/DreamBigQuotes2-scaled.jpg'
//         }

//     }

//     componentDidMount() {
//         console.log("we are in the vision board com did moiunt");
//         const {user_id} = this.props

//         const get_user_goal = async () => {

//             console.log(user_id);
//             try {
//                 const response = await fetch(`http://localhost:5000/api/vision_board/${user_id}`);
//                 const data = await response.json();
//                 console.log(data);
//                 if (data.msg === "null") {
    
//                     this.setState({ goals: {"msg":"nothingyet"}})
    
//                 } else {
//                    this.setState({goals: data})
//                 }
    
//             }
    
//             catch (e) {
//                 console.log(e);
//             }
//         };get_user_goal()

//     }


//     setDefault=(e)=>{
//       e.preventDefault(e)
        
//     //   const getDefautlImage=  document.getElementById(e )
//         // getDefautlImage.setAttribute('src', this.state.defaultImg);
//         // console.log(getDefautlImage.src);
//         console.log(e);
//     }
    

//     render() {

//         const goals = this.state.goals
        
//         return (
//             <>
//             <h1>Hola </h1>

// {/* 
//                 <div className="vision_board">
//                 <h1>Yo yoyo</h1>

//                 {
//                     goals.map((item) => {
//                         const imageOne = item.image_one
//                         const imageTwo = item.image_two
//                         const defaultImage = this.state.defaultImg

//                         return (
//                             <div key={item.goal_id} className='vision_board_goal_display'>

                              

//                                <img src={imageOne} id='img1' className='image_display' onError ={this.setDefault} /> 

//                                <img src={imageTwo} id='img2' className='image_display' onError ={this.setDefault}/> 

//                             </div>

//                         )
//                     })
//                 }
//             </div> */}
//             </>


//         )
//     }
// }


// // const VisionsBoard =(props)=>{
// //     const visionBoardGoals = props

// //     const getMyGoals = async(props)=>{
// //         console.log(props);
// //         const results = await fetch('http://localhost:5000/api/goals')
// //         const data = await results.json()
// //         console.log(data);
// //     }

// //     getMyGoals()

// //     // console.log(data);


// //     return(
// //         <>
// //         <div>
// //             {/* {
// //             this.props.map(item=> console.log(item))
// //             }
// //             <h1> Hola</h1> */}


// //         </div>


// //         </>
// //     )
// // }

// export default VisionsBoard