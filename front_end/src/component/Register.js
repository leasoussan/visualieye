import React, { useState } from 'react';
import { Link , useNavigate} from 'react-router-dom';
import Button from 'react-bootstrap/Button';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
import Card from 'react-bootstrap/Card';


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
                navigate('/login');
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
        <div className="login template d-flex justify-content-center align-items-center 100-w">
          <div className="form_container p-4 rounded bg-white">
            <form onSubmit={handleSubmit} >
              <h3 className="mb-4">Register</h3>
              <div className="mb-4 text-start">
                <label className="mb-2" htmlFor="username" >User Name</label>
                <input
                  type="text"
                  name="username"
                  id="username"
                  value={formData.username}
                  onChange={handleInputChange}
                  placeholder="UsernameName"
                  className='form-control'
                />
              </div>
              <div className="mb-4 text-start">
                <label className="mb-2" htmlFor="email">Email</label>
                <input
                  type="email"
                  name="email"
                  id="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  placeholder="Email"
                  className='form-control'
                />
              </div>
              <div className="mb-4 text-start">
                <label className="mb-2" htmlFor="password">Password</label>
                <input
                  type="password"
                  name="password"
                  id="password"
                  value={formData.password}
                  onChange={handleInputChange}
                  placeholder="Password"
                  className='form-control'
                />
              </div>
              <div className="mb-4 text-start">
                <label className="mb-2" htmlFor="confirmPassword">Confirm Password</label>
                <input
                  type="password"
                  name="confirmPassword"
                  id="confirmPassword"
                  value={formData.confirmPassword}
                  onChange={handleInputChange}
                  placeholder="Confirm Password"
                  className='form-control'
                />
              </div>
              {error && <p className="error">{error}</p>}
              <div className='d-grid'>
                <button className="h-8 rounded-full bg-[#ffc93c] hover:bg-[#ffc93c]/50" type="submit">Register</button>
              </div>
            </form>
          </div>
        </div>
        </>
      
      /* // <div bg="dark" className="d-flex justify-content-center align-items-center">
      //   <Link to="/login" id="go_to_login" />
      //   <Form className="rounded p-4 p-sm-3" onSubmit={handleSubmit}>
      //     <h3>Register</h3>
      //     <Form.Group as={Row} className="mb-3" controlId="username">
      //         <Form.Label column sm="3">
      //           User Name
      //         </Form.Label>
      //         <Col sm="7">
      //           <Form.Control type="text" value={formData.username} placeholder="Enter username" onChange={handleInputChange} />
      //         </Col>
      //       </Form.Group>
      //     <Form.Group as={Row} className="mb-3" controlId="email">
      //         <Form.Label column sm="3">
      //           Email
      //         </Form.Label>
      //         <Col sm="7">
      //           <Form.Control type="email" placeholder="Enter email" value={formData.email} onChange={handleInputChange}/>
      //         </Col>
      //       </Form.Group>
      //       <Form.Group as={Row} className="mb-3" controlId="password">
      //       <Form.Label column sm="3">
      //         Password
      //       </Form.Label>
      //       <Col sm="7">
      //         <Form.Control type="password" placeholder="Password" value={formData.password} onChange={handleInputChange}/>
      //       </Col>
      //     </Form.Group>
      //     <Form.Group as={Row} className="mb-3" controlId="confirmPassword">
      //       <Form.Label column sm="3">
      //         Confirm Password
      //       </Form.Label>
      //       <Col sm="7">
      //         <Form.Control type="password" placeholder="Confirm Password" value={formData.confirmPassword} onChange={handleInputChange}/>
      //       </Col>
      //       {error.length > 0 && ( */
      //           <div>{error}</div>
      //         
      //     </Form.Group>
      //     <Button variant="warning" type="submit" className='mb-3'>
      //         Register
      //       </Button>
      //   </Form>
      // </div>
    );
  };
  export default Register
