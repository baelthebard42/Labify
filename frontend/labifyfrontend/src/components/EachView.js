import React from 'react'
import { useParams, Navigate , useNavigate} from 'react-router-dom'
import axiosInstance from '../axios';
import { useState, useEffect } from 'react';
import { getUser } from '../utils';
import Button from 'react-bootstrap/Button';
import axios from 'axios';

export default function EachView({user}) {
    const {id} = useParams();
    const [lab, setLab] = useState(null)
    const [instructor, setinstructor] = useState(null)
    const [loading, setloading] = useState(true)
    const [studentLab, setstudentLab]=useState(null)
    const [pdf, setpdf]=useState(null)
    const [waitMessage, setwaitMessage] = useState(false)
    const [redirect, setRedirect] = useState(null);

    const handleFileChange = (e) => {
        setpdf(e.target.files[0]);
      };

      const navigate=useNavigate()


useEffect(()=>{
    console.log(pdf)
}, [pdf])


      function handleSubmit(){
        setwaitMessage(true)
        if (pdf !== null) {
            const formData = new FormData();
            formData.append('pdf', pdf);
      
            axios.post('http://127.0.0.1:8000/labify/upload', formData, {
                headers: {
                  'Content-Type': 'multipart/form-data', 
                }})
              .then((res) => {
                console.log(JSON.parse(res.data))
                navigate('/prelabtest', {state: JSON.parse(res.data) })
                
              })
              .catch((error) => {
                console.error('Error uploading file:', error);
              });
          }
    }

    

    useEffect(()=>{

        axiosInstance.get(`labify/oneLab/${id}`)
        .then((res)=>{
            setLab(res.data)
            setloading(false)
        })


        


    }, [id])

   if (loading){
    return(
        <h3>
            Loading...
        </h3>
    )
   }
   

    if (lab!==null  && user!==null){



        return (

            <div style={{margin: '2cm'}}>
          
          <center>
              <h2>{lab.topic}</h2><br/>
          </center>
          
   <p><b>Date-Time : </b>{lab.dateTime}</p><br/>
   <p><b>Objective : </b>{lab.objective}</p><br/>
   <p><b>Requirements : </b>{lab.requirements}</p><br/>
   <p><b>Theory : </b>{lab.theory}</p><br/>

<center>
<legend hidden={user.user_type==='instructor'}>Submit your initial</legend>
   <input hidden={user.user_type==='instructor'} type="file" onChange={handleFileChange}/><br/><br/>
   <Button onClick={handleSubmit} variant="dark">Submit</Button><br/>
   <p hidden={!waitMessage} style={{color:'green'}}><small>Please wait, our AI is generating questions for your test. You will be redirected to the quiz page shortly. </small></p>
   </center>




          
            </div>
          
            )

    }
 
}
