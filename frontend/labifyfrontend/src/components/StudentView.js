import React, { useEffect, useState } from 'react'
import axiosInstance from '../axios'


export default function StudentView() {

    const [allLabs, setallLabs]=useState(null)

    useEffect(()=>{
        axiosInstance.get(`labify/initiateLab`)
        .then((res)=>{
            setallLabs(res.data)
        })
    },[]);
console.log(allLabs);
  return (
    <>
    </>
  )
}
