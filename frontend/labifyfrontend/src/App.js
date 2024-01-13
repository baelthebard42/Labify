
import './App.css';
import {useState } from 'react'
import InstructorView from './components/InstructorView';

function App({type}) {

  
  if (type!==null){

    return (
      <div className="App">

        {
          type === 'instructor' ? (
            <InstructorView/>
          ) : (
            <></>
          )
        }
        
       
      </div>
    );


  }

  


  
}

export default App;
