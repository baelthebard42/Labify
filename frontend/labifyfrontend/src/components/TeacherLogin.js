import React from 'react'
import SideDesign from './SideDesign'
import Button from 'react-bootstrap/Button';
import { useLocation, Link } from 'react-router-dom';
import { useEffect, useState } from 'react';
import Form from 'react-bootstrap/Form';
import InputGroup from 'react-bootstrap/InputGroup';
import  axiosInstance  from '../axios';

export default function TeacherLogin() {

  const location=useLocation();
  const params= new URLSearchParams(location.search)
  const [redirected, setisRedirected]=useState(false)
  const [confused, setConfused]=useState(false)
  const [error, seterror]=useState(false)
  const [formData, setFormData]=useState(null)

  const decode = token => decodeURIComponent(atob(token.split('.')[1].replace('-', '+').replace('_', '/')).split('').map(c => `%${('00' + c.charCodeAt(0).toString(16)).slice(-2)}`).join(''));

   useEffect(()=>{
    if(params.get('registration')==='complete'){ //checking if redirected from the registration page
        setisRedirected(true)}
   }, [params])


   function handleInputChange(e){
    setFormData({
      ...formData,
      [e.target.name]: e.target.value.trim()

    })
  }

  function handleSubmit(e){
    e.preventDefault()
    
    axiosInstance.post('api/token/', formData)
    .then((res)=>{

      const decodedToken=JSON.parse(decode(res.data.access))

      if (decodedToken.user_type==='student'){
        setConfused(true)
      }

      if (decodedToken.user_type==='instructor'){
        localStorage.setItem('access_token', res.data.access) //storing value of access token in the browser
        localStorage.setItem('refresh_token', res.data.refresh)
        window.location.reload()
      }

    })
    .catch((err)=>{
      console.log(err)
      seterror(true)
    })
  }



  return (
    <>
    <SideDesign/>

    <div style={{marginLeft: '24cm', marginTop: '-5cm'}}>
     <center>
     <p hidden={!redirected} style={{color:'green'}}><small>Registration completed! Please login to continue. </small></p>
      <h3>Instructor Login</h3><br/>
      
      <Form onSubmit={(e)=>handleSubmit(e)}>
      
      <InputGroup className="mb-1 bars"  style={{width: '9cm', paddingBottom: '0.3cm'}}>
        
        <Form.Control
          placeholder="Email"
          name="email"
          aria-describedby="basic-addon1"
          required
         autoFocus
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
        

      <Button variant="dark" type="submit">Login</Button><br/>
      <p hidden={!confused} style={{color:'red'}}><small>It appears you've mistaken this page for student's login. Click <Link to='/loginStd'>here</Link> for student's login.  </small></p>

      <p hidden={!error} style={{color:'red'}}><small>The email or password isn't matching. </small></p>
      </Form>
      </center>
     </div>
    
    </>
  )
}
