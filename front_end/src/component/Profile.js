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


    }




    render() {


        return (

            <>

                <CheckUserLogIn />
                <Link to='/login' id='go_to_login' />

                <h1> about me here </h1>
            </>
        )
    }
}
export default Profile