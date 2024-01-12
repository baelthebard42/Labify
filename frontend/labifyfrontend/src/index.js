import React  from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import {createBrowserRouter, RouterProvider,} from "react-router-dom";
import TeacherLogin from "./components/TeacherLogin"
import TeacherRegister from './components/TeacherRegister';
import StudentLogin from './components/StudentLogin'
import StudentRegister from './components/StudentRegister'
import NavBar from './components/NavBar';
import axiosInstance from './axios';
import { useState, useEffect } from 'react';
import { Navigate } from 'react-router-dom';
import Logout from './components/Logout';


function Index(){

  const [IsLoggedIn, setIsLoggedIn]=useState(false)
  const [name, setname]=useState(null)
  const [type, setType]=useState(null)

  const access_token=localStorage.getItem('access_token') ? localStorage.getItem('access_token') : null

  const router=createBrowserRouter([
    { path: "/", element: IsLoggedIn ? <App/> : <StudentLogin/>},
    { path: "/registerIns", element: IsLoggedIn ? <Navigate to="/"/> : <TeacherRegister/> },
    { path: "/registerStd", element: IsLoggedIn ? <Navigate to="/"/> : <StudentRegister/>},
    { path: "/loginIns", element: IsLoggedIn ? <Navigate to="/"/> : <TeacherLogin/>},
    { path: "/loginStd", element: IsLoggedIn ? <Navigate to="/"/> : <StudentLogin/>},
    { path: "/logout", element: <Logout/>}
  
  ])

  useEffect(()=>{
    fetchAuthUser();
  })

  


return(
  <React.StrictMode>
    <NavBar IsLoggedIn={IsLoggedIn} name={name} type={type}/>
    <RouterProvider router={router} />
  </React.StrictMode>
)

async function fetchAuthUser(){

  if (access_token!==null){
    try{
const res = await axiosInstance.get('users/getAuthUser')
setIsLoggedIn(true)
setname(res.data.firstname)
setType(res.data.user_type)}
catch(err){
  console.error(err)
}
  }

}





}





const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <Index/>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();


