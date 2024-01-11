
import './App.css';
import {useState } from 'react'

function App() {

  const [connected, setConnected]=useState(false)

  async function checkConnect(){
  fetch('http://127.0.0.1:8000/labify/checkConnect')
  .then((res)=>{
    console.log(res)
    setConnected(true)
  })
  
  
  }


  return (
    <div className="App">
      <h4>Hello I'm Labify</h4>
      <button onClick={()=>{checkConnect()}}>Click to check connection</button><br/>
      <p>{connected ? 'You are connected': 'You are not connected'}</p>
    </div>
  );
}

export default App;
