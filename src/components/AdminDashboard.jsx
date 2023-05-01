import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { Outlet, useNavigate } from 'react-router-dom';
import DashboardHeader from './DashboardHeader';


export default function AdminDashboard() {








const callAuthApi= async ()=>{
  
  const token = localStorage.getItem("token");
        try {
             const response= await axios.get("http://localhost:5000/admin-dashboard", {
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${token}`
                },
            });
            
           
                       
            
           
           
        }
        catch (error) {
            
        }

 }


 //useEffect(()=>{callAuthApi()},[])


 
  return (
    <div className='Dashboard'>
     <DashboardHeader/>
     <Outlet/>
  </div>
  )
 
 
  
}
