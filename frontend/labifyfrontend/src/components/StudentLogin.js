import React from 'react'
import Form from 'react-bootstrap/Form';
import InputGroup from 'react-bootstrap/InputGroup';
import SideDesign from './SideDesign'
import Button from 'react-bootstrap/Button';
import { useLocation,Link } from 'react-router-dom';
import { useEffect, useState } from 'react';
import  axiosInstance  from '../axios';



export default function StudentLogin() {

  
  const decode = token => decodeURIComponent(atob(token.split('.')[1].replace('-', '+').replace('_', '/')).split('').map(c => `%${('00' + c.charCodeAt(0).toString(16)).slice(-2)}`).join(''));
  const location=useLocation();
  const params= new URLSearchParams(location.search)
  const [redirected, setisRedirected]=useState(false)
  const [formData, setFormData]=useState(null)
  const [error,setError]=useState(false)
  const [confused, setconfused]=useState(false)
  

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

      if (decodedToken.user_type==='instructor'){
        setconfused(true)
      }

      if (decodedToken.user_type==='student'){
        localStorage.setItem('access_token', res.data.access) //storing value of access token in the browser
        localStorage.setItem('refresh_token', res.data.refresh)
        window.location.reload()
      }

    })
    .catch((err)=>{
      console.log(err)
      setError(true)
    })
  }


   useEffect(()=>{
    if(params.get('registration')==='complete'){ //checking if redirected from the registration page
        setisRedirected(true)}
   }, [params])


  return (
    <>
    <SideDesign/>
     
     <div style={{marginLeft: '24cm', marginTop: '-5cm'}}>
     <center>
     <p hidden={!redirected} style={{color:'green'}}><small>Registration completed!. Please login to continue. </small></p>
      <h3>Student Login</h3><br/>
      
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
        

      <Button type="submit" variant="dark">Login</Button><br/>
      <p hidden={!confused} style={{color:'red'}}><small>It appears you've mistaken this page for instructor's login. Click <Link to='/loginIns'>here</Link> for instructor's login.  </small></p>
      <p hidden={!error} style={{color:'red'}}><small> The email or password isn't matching. </small></p>
      </Form>
      </center>
     </div>
    </>
   
  )
}
