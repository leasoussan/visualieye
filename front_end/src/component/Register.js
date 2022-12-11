import React from 'react';
import { Link , Redirect} from 'react-router-dom';
import {CheckUserLogIn} from './CheckUserLogIn.js'


class Register extends React.Component {
    constructor(props) {
        super(props);
        this.state={
            first_name: '',
            last_name: '',
            username: '',
            email: '',
            password_1:'' ,
            password_2:'', 
            isLoggin: false
        }

    }


   
    getData = (e) => {
        const { first_name, last_name, username, email, password_1, password_2} = this.state 
        console.log(JSON.stringify({ first_name, last_name, username, email, password_1, password_2 }));

        e.preventDefault();

        fetch('http://localhost:5000/register', {
            method:"POST",
            headers:{ 'Content-type' : 'application/json'},
            body:JSON.stringify({ first_name, last_name, username, email, password_1, password_2 })

            })
            .then(res => res.json())
            .then(data => {
                this.setState({user:data});
                console.log(this.user);
                document.getElementById('go_to_login').click()
            })
            
            .catch(e => {
                console.log(e);
            })
            localStorage.setItem('isLoggin', [this.id=this.state.id, this.username=this.state.username, this.isLoggin=true,]); 
            console.log(this.state);
            e.target.reset()
    }
  
    componentDidMount(){
   
    }

   
    componentDidUpdate(){
       
    }
    handleInputChange=(e)=>{
      this.setState({[e.target.name]: e.target.value});
    }


    render() {
        return (
            <>
                 <CheckUserLogIn />
                <Link to='/login' id='go_to_login' />
                <form className="form" onSubmit={this.getData}>
                    <div className="form-body">
                        <div className="first_name">
                            <label name="form__label" for="first_name">First Name </label>
                            <input name="first_name" type="text"  onChange= {this.handleInputChange} id="first_name" placeholder="First Name" />
                        </div>
                        <div className="lastname">
                            <label name="form__label" for="lastName">Last Name </label>
                            <input type="text" name="last_name" id="lastName"  className="form__input" onChange= {this.handleInputChange}  placeholder="LastName" />
                        </div>
                        <div className="username">
                            <label name="form__label" for="username">First Name </label>
                            <input name="username" type="text" onChange= {this.handleInputChange}  id="username" placeholder="UsernameName" />
                        </div>
                        <div className="email">
                            <label name="form__label" for="email">Email </label>
                            <input type="email" id="email" name="email"  onChange= {this.handleInputChange}  placeholder="Email" />
                        </div>
                        <div className="password">
                            <label className="form__label" for="password">Password </label>
                            <input name="password_1" type="password" id="password"  onChange= {this.handleInputChange}  placeholder="Password" />
                        </div>
                        <div className="confirm-password">
                            <label className="form__label" for="confirmPassword">Confirm Password </label>
                            <input name="password_2" type="password" id="confirmPassword"  onChange= {this.handleInputChange}  placeholder="Confirm Password" />
                        </div>
                    </div>
                    <div class="footer">
                        <button  onClick={this.handleSubmit} type="submit" class="btn">Register</button>
                       
                    </div>
                </form>

              
            </>
        )
    }
}

export default Register
