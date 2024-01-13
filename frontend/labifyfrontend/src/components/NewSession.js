import React, {useState, useEffect} from 'react'
import axiosInstance from '../axios'
import { Navigate, useLocation } from 'react-router-dom'
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import InputGroup from 'react-bootstrap/InputGroup';
import Modal from 'react-bootstrap/Modal';


export default function NewSession({type}) {

  const location = useLocation()
  const params=new URLSearchParams(location.search)

  


   
  
    const [formData, setformData]=useState({studentsList : []})
    const [show, setShow] = useState(false);
    const [suggestions, setsuggestions] = useState([])
    const [student, setstudent]=useState([])
    const [message, setmessage]=useState(false)
    
    useEffect(()=>{
      if(params.get('initialization')==='done'){ 
        setmessage(true)}
   }, [params]
    )
    

  
useEffect(()=>{
  fetchStudents();
})


    


    if ( type==='student') {
        return(
            <Navigate to ="/"/>
        )
        
    }

    
    
    

    const handleShow = () => setShow(true);
  
        
   
  

   function handleChange(e){
    setformData({
        ...formData,
        [e.target.name] : e.target.value.trim()
    })
   }

   function handleClose(){
    setShow(false)
   }


   function handleInputChange(e){
    
    if (student.length!==0){
      
    
      const input = e.target.value;
      
      
    
      const filteredStds = student.filter((one) =>{
        
       return ((one.firstname).toLowerCase()).startsWith(input.toLowerCase())}
    );
    console.log(filteredStds)
    
    setsuggestions([...filteredStds])
      }
    }

   

    function handleselect(e, id){
      
      
      if (e.target.checked) {
        setformData({...formData, studentsList : [...formData.studentsList, id]})
        
      } else {
        setformData({...formData, studentsList : [...formData.studentsList.filter((item)=>item!==id)]})
        
      }
    
    }

    function handleSubmit(e){
      e.preventDefault()
    
      axiosInstance.post('labify/initiateLab', formData)
      .then((res)=>{
        console.log(res)
        const promises = []

        for (const each of formData.studentsList){
        
         const promise = axiosInstance.post('labify/createStudentInstance', {
          student : each,
          lab : res.data.id
         })
         promises.push(promise)
        }

        Promise.all(promises)
        .then(()=>{
          window.location.href='/newlabsession?initialization=done'
        })
      })
      .catch((err)=>{
        console.log(err)
      })

      
    }

    
  return (
    <>

    <center>
    <p hidden={!message} style={{color:'green'}}><small>Lab session successfully initialized !! </small></p>
        <h3 style={{marginTop: '1.5cm'}}>Initialize New Lab Session</h3><br/>
        <Form onSubmit={(e)=>handleSubmit(e)}>

        <InputGroup className="mb-1 bars" style={{width : '9cm', marginBottom: '0.5cm'}}>
        
        <Form.Control
          placeholder="Select date and time"
          type="datetime-local"
          name="dateTime"
          aria-describedby="basic-addon1"
          required
          onChange={handleChange}
          autoFocus
          
        />
        
      </InputGroup>

      <InputGroup className="mb-1 bars" style={{width : '9cm', marginBottom: '0.5cm'}}>
        
        <Form.Control
          placeholder="Topic"
          name="topic"
          aria-describedby="basic-addon1"
          required
          onChange={handleChange}
          style={{marginBottom: '0.3cm'}}
        />
        
      </InputGroup>

      <InputGroup className="mb-1 bars" style={{width : '9cm', marginBottom: '0.5cm'}}>
        
        <Form.Control
          placeholder="Objective"
          name="objective"
          aria-describedby="basic-addon1"
          required
          onChange={handleChange}
          style={{marginBottom: '0.3cm'}}
        />
        
      </InputGroup>

      <InputGroup className="mb-1 bars" style={{width : '9cm', marginBottom: '0.5cm'}}>
        
        <Form.Control
          placeholder="Theory"
          style={{height: '5cm'}}
          name="theory"
          aria-describedby="basic-addon1"
          required
          onChange={handleChange}
          
        />
        
      </InputGroup>

      <InputGroup className="mb-1 bars" style={{width : '9cm', marginBottom: '0.5cm'}}>
        
        <Form.Control
          placeholder="Requirements"
          name="requirements"
          aria-describedby="basic-addon1"
          required
          onChange={handleChange}
          style={{marginBottom: '0.3cm'}}
        />
        
      </InputGroup>

      <InputGroup className="mb-1 bars" style={{width : '9cm', marginBottom: '0.5cm'}}>
        
        <Form.Control
          placeholder="Resources"
          name="resources"
          aria-describedby="basic-addon1"
          required
          onChange={handleChange}
          style={{marginBottom: '0.3cm'}}
        />
        
      </InputGroup>

      <InputGroup className="mb-1 bars" style={{width : '9cm', marginBottom: '0.5cm'}}>
        
        <Form.Control
          placeholder="Group name"
          name="sectionName"
          aria-describedby="basic-addon1"
          required
          onChange={handleChange}
          style={{marginBottom: '0.3cm'}}
        />
        
      </InputGroup>

      <Modal
        show={show}
        onHide={handleClose}
        backdrop="static"
        keyboard={false}
      >
        <Modal.Header closeButton>
          <Modal.Title>Select students </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          
        <Form.Control
         autoFocus
          placeholder="Enter student's name"
          onChange={handleInputChange}
          id='sea'
          aria-describedby="basic-addon1"
          
        /><br/><br/>

        
         <>

         {            
         
         
         suggestions.map((stud)=>{
          return(

            <div key={stud.id}>
            <input type='checkbox' checked={ formData.studentsList.includes(stud.id) }  onChange={(e)=>handleselect(e, stud.id)} style={{marginRight:'0.5cm'}}/> 
            <label> {stud.firstname} {stud.lastname} - RollNo : {stud.rollnum} </label>    

          <hr/><br/>
          </div>

          )
           
          })
         }
          
         </>

         
        </Modal.Body>
        <Modal.Footer>
          
          <Button variant="dark" onClick={()=>handleClose()}>Done</Button>
        </Modal.Footer>
      </Modal>

      <Button variant="secondary" style={{marginRight:'0.5cm', width: '4cm'}} onClick={()=>{handleShow()}}>
        Select students
      </Button><br/><br/>

      <Button type="submit" variant="dark">Initialize</Button>


        </Form>
    </center>

    </>
  )


async function fetchStudents(){

  try{

  
  const res = await axiosInstance.get('users/create')
  if (student.length===0 && suggestions.length===0){
    setstudent([...res.data.filter((item)=>item.user_type==='student')])
    setsuggestions([...res.data.filter((item)=>item.user_type==='student')])
  }
  


  }
  catch(err){
    console.log(err)
  }
  
    

  
    
    

}


}
