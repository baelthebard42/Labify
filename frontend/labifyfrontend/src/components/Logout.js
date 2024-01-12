import React from 'react'
import { useNavigate } from 'react-router-dom'
import axiosInstance from '../axios'

export default function Logout() {

    const navigate=useNavigate();

    axiosInstance.post('users/logout',{
        refresh_token:localStorage.getItem('refresh_token')
    })
    .then(()=>{
        navigate('/')
    })

    
    localStorage.removeItem('access_token')
    localStorage.removeItem('refresh_token')
    axiosInstance.defaults.headers['Authorization']=null;



  return (
    <>
    </>
  )
}
