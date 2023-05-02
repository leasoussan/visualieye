import React, { useState } from 'react';
import { Link , useNavigate} from 'react-router-dom';


const Register =()=> {
    const [ formData, setFormData]=useState({
            username: '',
            email: '',
            password:'' ,
            confirmPassword:'',
          
        });
        const [error, setError]= useState('');
        const navigate = useNavigate();
   
    const handleInputChange=(e)=>{
        console.log(e.target);
        setFormData({...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e)=>{
        e.preventDefault();
        // set up the connection :
        const { username, email, password, confirmPassword} = formData;
        
        // Validate the Form
        if(!username && !email && ! password && !confirmPassword){
            setError('All fields are Required');
            return;
        }
        // another condition
        if(password !== confirmPassword){
            setError('Password not matching');
            return;

        }
        // after checking all is correct we try to connect to DB
        try{
            const result = await fetch('http://localhost:5000/register', {
                        method:"POST",
                        headers:{ 'Content-type' : 'application/json'},
                        body:JSON.stringify(formData)
            
                        });

            const data = await result.json();
            if(result.ok){
                navigate('login');
            }else{
                setError(data.message)
            };
        }
        catch (err){
            console.log(err);
            setError('Something is wrong here')
        }
    };
   
 




    return(
        <>
        <Link to="/login" id="go_to_login" />
        <form className="form" onSubmit={handleSubmit}>
          <div className="form-body">
            <div>
              <label htmlFor="username">User Name</label>
              <input
                type="text"
                name="username"
                id="username"
                value={formData.username}
                onChange={handleInputChange}
                placeholder="UsernameName"
              />
            </div>
            <div>
              <label htmlFor="email">Email</label>
              <input
                type="email"
                name="email"
                id="email"
                value={formData.email}
                onChange={handleInputChange}
                placeholder="Email"
              />
            </div>
            <div>
              <label htmlFor="password">Password</label>
              <input
                type="password"
                name="password"
                id="password"
                value={formData.password}
                onChange={handleInputChange}
                placeholder="Password"
              />
            </div>
            <div>
              <label htmlFor="confirmPassword">Confirm Password</label>
              <input
                type="password"
                name="confirmPassword"
                id="confirmPassword"
                value={formData.confirmPassword}
                onChange={handleInputChange}
                placeholder="Confirm Password"
              />
            </div>
            {error && <p className="error">{error}</p>}
            <button type="submit">Register</button>
          </div>
        </form>
      </>
    );
  };
  export default Register
