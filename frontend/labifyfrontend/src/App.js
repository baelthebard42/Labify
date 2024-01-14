
import './App.css';
import {useState } from 'react'
import InstructorView from './components/InstructorView';
import StudentView from './components/StudentView';

function App({type, name}) {

  
  if (type!==null){

    return (
      <div className="App">

        {
          type === 'instructor' ? (
            <InstructorView name={name}/>
          ) : (
            <StudentView name={name}/>
          )
        }
        
       
      </div>
    );


  }

  


  
}

export default App;
