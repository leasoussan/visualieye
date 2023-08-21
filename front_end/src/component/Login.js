import React, { useState } from 'react';
import { Link, useNavigate } from "react-router-dom"
import { CheckUserLogIn } from './CheckUserLogIn';


const Login = ({setIsLoggedIn}) => {
  const [formData, setFormData] = useState({ email: '', password: '' })
  const [error, setError] = useState('')
  const navigate = useNavigate()

  // const handleChange = (e) => {
  //   setFormData({ ...formData, [e.target.name]: e.target.value })
  //   console.log(formData);
  // }
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevFormData => ({ ...prevFormData, [name]: value }))
    console.log("we change here", name, value);
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { email, password } = formData;
    const validEmail = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i;
    if (!validEmail.test(email)) {
      setError("Please enter a valid email");
      return;
    }
    if (!email || !password) {
      setError("Please enter both email and password");
      return;
    }
  
    try {
      console.log("in the try block");
      const res = await fetch(`http://localhost:5000/login`, {
        method: 'POST',
        headers: { 'content-Type': 'application/json' },
        body: JSON.stringify({ email, password })
      })
      const data = await res.json();
      const userId =  data[0]["id"];
      setIsLoggedIn(true)
      localStorage.setItem('isLoggin', true)
      localStorage.setItem('user_id', JSON.stringify(userId))
      navigate(`/vision_board/${userId}`)

    } catch (err) {
      console.log("Sorry, you are not logged in. Please try again.", err);
    }
  };

  

  return (
    <>
      <form onSubmit={handleSubmit}>
        <label htmlFor="email">Email</label>
        <input type="text" name="email" id="email" onChange={handleChange} />
        <label htmlFor="password">Password</label>
        {error.length > 0 && (
          <div>{error}</div>
        )}
        <input type="password" name="password" id="password" onChange={handleChange} />
        <input type="submit" />
      </form>
    </>

  )
}

export default Login


