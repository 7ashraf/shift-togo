import React, { useState } from 'react';
import styled from 'styled-components';
import { useSignup } from "../hooks/useSignup"
import Form from 'react-bootstrap/Form';
import { Button } from 'react-bootstrap';



const Signup = () => {
  const [email, setEmail] = useState('');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [password, setPassword] = useState('');
  const [userType, setUserType] = useState('');


  const {signup, error, isLoading} = useSignup()


  const handleSubmit = async (e) => {
    e.preventDefault()

    await signup(email, password, firstName, lastName, userType)
  }

  return (

    <div>
      
      <Form className="signup" onSubmit={handleSubmit}>
      <h3>Sign Up</h3>
      <Form.Group className="mb-3" controlId="firstName">
        <Form.Label>First Name</Form.Label>
        <Form.Control type="text" placeholder="Enter your first name" onChange={(e) => setFirstName(e.target.value)} 
            value={firstName}  />
        
      </Form.Group>
      <Form.Group className="mb-3" controlId="lastName">
        <Form.Label>Last Name</Form.Label>
        <Form.Control type="text" placeholder="Enter your last name" onChange={(e) => setLastName(e.target.value)} 
            value={firstName}  />
        
      </Form.Group>

      <Form.Group className="mb-3" controlId="formBasicEmail">
        <Form.Label>Email address</Form.Label>
        <Form.Control type="email" placeholder="Enter email" onChange={(e) => setEmail(e.target.value)} 
            value={email}  />
        
      </Form.Group>

      <Form.Group className="mb-3" controlId="formBasicPassword">
        <Form.Label>Password</Form.Label>
        <Form.Control type="password" placeholder="Password" onChange={(e) => setPassword(e.target.value)} 
            value={password} />
     </Form.Group>

     <div>
      
        <div>
        User Type:
        <div>
          <div>
            <input
              type="radio"
              value="employer"
              checked={userType === 'employer'}
              onChange={() => {setUserType('employer')}}
            />
            Employer
          </div>
          <div>
            <input
              type="radio"
              value="jobSeeker"
              checked={userType === 'jobSeeker'}
              onChange={() => setUserType('jobSeeker')}
            />
            Job Seeker
          </div>
        </div>
      </div>


      
     </div>

     <Button variant="primary" disabled={isLoading} type="submit">
        Submit
      </Button>

          {error && <div className="error">{error}</div>}
     </Form>

     </div>
  );
};

export default Signup;
