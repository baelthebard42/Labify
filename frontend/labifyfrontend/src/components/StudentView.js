import React, { useEffect, useState } from 'react'
import axiosInstance from '../axios'
import { Link } from 'react-router-dom';

export default function StudentView({name}) {

    const [allLabs, setallLabs]=useState(null)

    useEffect(()=>{
        axiosInstance.get(`labify/last`)
        .then((res)=>{
            setallLabs(res.data)
        })
    },[]);

    const formatDateTime = (dateTimeString) => {
      const options = { year: 'numeric', month: 'short', day: 'numeric', hour: 'numeric', minute: 'numeric', hour12: true };
      return new Date(dateTimeString).toLocaleString('en-US', options);
    };

   
    return (
      <div style={{ marginTop: '1.5cm', marginLeft: '2cm', marginRight: '2cm' }}>
        <center>
          <h3>Welcome back {name} !</h3>
          <br />
          <br />
        </center>
        {allLabs === null ? (
          <>
            <br />
            <br />
            <center>
              <h2>Loading...</h2>
            </center>
          </>
        ) : allLabs.length === 0 ? (
          <>
            <br />
            <br />
            <center>
              <h2>Bingoo! You have no upcoming labs!!</h2>
            </center>
          </>
        ) : (
          <div
            style={{
              border: '1px solid #ccc',
              borderRadius: '10px',
              padding: '10px',
              marginTop: '10px',
            }}
          >
            <h5>
              <b>Your upcoming labs</b>
            </h5>
            {allLabs.map((lab) => (
              <Link style={{textDecoration: 'none', color: 'black'}} to={`lab/${lab.id}`}>
              <div
                key={lab.id}
                style={{
                  marginBottom: '10px',
                  padding: '10px',
                  border: '1px solid #ccc',
                  borderRadius: '10px',
                }}
              >
                <p>
             <b>Lab date and time: {formatDateTime(lab.dateTime)},  Group:{lab.sectionName}<br/> Topic: {lab.topic}</b> 
                </p>
              </div>
              </Link>
            ))}
          </div>
        )}
      </div>
    );
  }
