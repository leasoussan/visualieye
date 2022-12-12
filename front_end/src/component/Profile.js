import React from "react";
import { CheckUserLogIn } from "./CheckUserLogIn";
import { Link } from "react-router-dom";
import NavBar from "./NavBar";
class Profile extends React.Component {
    constructor() {
        super();
        this.state = {

        }
    }

    componentDidMount() {
        const getusername = () => {
                const getuser = localStorage.getItem('isLoggin');
                if (getuser) {
                    const getUserId = getuser.split(',')[1]
                    this.setState({username:getUserId})
                }
                else {
                    return 0
                }
        
            };getusername()
        

    }




    render() {


        return (

            <>

                <CheckUserLogIn />
                <Link to='/login' id='go_to_login' />

                <h1> About me here {this.state.username}</h1>

                <h2> Affiramtion 1 </h2>
                <h2> Affiramtion 2 </h2>
                
            </>
        )
    }
}
export default Profile