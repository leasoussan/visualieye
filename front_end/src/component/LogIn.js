import React, { useState } from 'react';
import { Link } from "react-router-dom"
import {CheckUserLogIn} from './CheckUserLogIn';
class LogIn extends React.Component {
    constructor() {
        super();
        this.state = {
            email: '',
            id: '',
            username: '',
            err_mesg: ''

        }
    }

    componentDidMount() {
 

    }

    handleChange = (e) => {
        console.log(e.target.name, e.target.value);
        this.setState({ [e.target.name]: e.target.value })

    }

    handleSubmit = (e) => {
        const { email, id, password, username } = this.state

        e.preventDefault();

        fetch('http://localhost:5000/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ email, password, id, username })
        })
            .then(res => res.json())
            .then(data => {
                localStorage.setItem('isLoggin', [data[0].id, data[0].username])
     
                document.getElementById('loggin_redirect').click()
            })
            .catch(e => this.setState({ err_mesg: e }));
        console.log(localStorage);


        e.target.reset()

    };

    render() {
        return (
            <>
                   <CheckUserLogIn/>
                <Link id="loggin_redirect" to={`/my_goals/${this.id}`} ></Link>
                <Link to='/login' id='go_to_login' />
                <div className="form">
                    <form onSubmit={this.handleSubmit}>
                        <div className="input-container">
                            <label>Username </label>
                            <input type="email" name="email" required onChange={this.handleChange} />
                        </div>
                        <div className="input-container">
                            <label>Password </label>
                            <input type="password" name="password" required onChange={this.handleChange} />
                        </div>
                        <div className="button-container">
                            <input type="submit" />
                        </div>
                    </form>
                    <h1> {this.err_mesg}</h1>
                </div>
            </>

        );
    }
}
export default LogIn