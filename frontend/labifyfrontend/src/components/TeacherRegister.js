import React from 'react'
import SideDesign from './SideDesign'
import Form from 'react-bootstrap/Form';
import InputGroup from 'react-bootstrap/InputGroup';
import Button from 'react-bootstrap/Button';
import { useState } from 'react';
import axios from 'axios';

export default function TeacherRegister() {

  const initialFormData=Object.freeze({
    user_type: 'instructor'
  })

  const [formData, setFormData] = useState(initialFormData)
  const [error, seterror]=useState(false)
  


  function handleInputChange(e){
    
    setFormData({
      ...formData,
      [e.target.name]: e.target.value.trim()
    })
  }

  function handleSubmit(e){
    e.preventDefault()
    
    axios.post('http://127.0.0.1:8000/users/create', formData)
    .then((res)=>{
      console.log(res.data)
      window.location.href = '/loginIns?registration=complete';
    })
    .catch((err)=>{
      console.error(err)
      seterror(true)
    })
  }



  return (
    <>
    <SideDesign/>

    <div style={{marginLeft: '23cm', marginTop: '-7cm'}}>
     <center>
      <h3>Instructor Registration</h3><br/>
      
      <Form onSubmit={(e)=>handleSubmit(e)}>

      <InputGroup className="mb-1 bars"  style={{width: '9cm', paddingBottom: '0.3cm'}}>
        
        <Form.Control
        autoFocus
          placeholder="First Name"
          name="firstname"
          aria-describedby="basic-addon1"
          required
          onChange={(e)=>handleInputChange(e)}
         
          
        />
        
      </InputGroup>

      <InputGroup className="mb-1 bars"  style={{width: '9cm', paddingBottom: '0.3cm'}}>
        
        <Form.Control
          placeholder="Last Name"
          name="lastname"
          aria-describedby="basic-addon1"
          required
          onChange={(e)=>handleInputChange(e)}
          
        />
        
      </InputGroup>

      
      
      <InputGroup className="mb-1 bars"  style={{width: '9cm', paddingBottom: '0.3cm'}}>
        
        <Form.Control
          placeholder="Email"
          name="email"
          aria-describedby="basic-addon1"
          required
          onChange={(e)=>handleInputChange(e)}
          
        />
        
      </InputGroup>

      <InputGroup className="mb-1 bars"  style={{width: '9cm', paddingBottom: '0.3cm'}}>
        
        <Form.Control
          placeholder="Password"
          name="password"
          aria-describedby="basic-addon1"
          required
          type='password'
          onChange={(e)=>handleInputChange(e)}
          
        />
        
      </InputGroup>
        

      <Button type="submit" variant="dark">Register</Button><br/>
      <p hidden={!error} style={{color:'red'}}><small>An error occurred. Please try again. </small></p>
      

      
      </Form>
      </center>
     </div>
    
    </>
    
  )
}
