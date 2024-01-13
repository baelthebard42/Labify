import React, { useEffect, useState } from 'react'
import axiosInstance from '../axios'

export default function StudentView() {

    const [allLabs, setallLabs]=useState(null)

    useEffect(()=>{
        axiosInstance(`labify/initiateLab`)
        .then((res)=>{
            setallLabs(res.data)
        })
    })

  return (
    <>
    </>
  )
}
