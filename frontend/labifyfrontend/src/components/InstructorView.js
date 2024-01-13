import React, {useEffect, useState} from 'react'
import axiosInstance from '../axios'
import getUser from '../utils'

export default function InstructorView({name}) {

    const [allLabs, setallLabs] = useState(null)

    useEffect(()=>{

        axiosInstance.get('labify/getLabs')
    .then((res)=>{
        if (allLabs===null){
            
            setallLabs(res.data)
        }
    })

    


    })

    



  return (
    <>
   
    <div style={{marginTop: '1.5cm', marginLeft: '2cm', marginRight: '2cm'}}>
    <center>
        <h3>Welcome back! {name} </h3><br/><br/>
        </center>
        {
            allLabs !== null && allLabs.length === 0 ? (
                <><br/><br/>
               <center> <h2>Bingoo ! You have no upcoming labs !!</h2></center>
                </>
            ) : (

                <h5><b>Your upcoming labs</b> </h5>

            )
        }
        



        

    </div>
    
    </>
  )
}
