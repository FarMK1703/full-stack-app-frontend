import React, { useState } from 'react'
import { useNavigate } from "react-router-dom";
import useStore from '../Store/store';
import userIcon from '../assets/user-icon.svg'


export default function MainMenu({setLink}) {
  const [links,setLinkProperty]=useState(

    [

    {category:'smartphone', clicked:true, trancrypt:'смартфоны'},
    {category:'computer',clicked:false, trancrypt:'компьюетры'},
    {category:'forHome',clicked:false, trancrypt:'бытовая техника'}

  ]
  )

  const setIsAuthFalse=useStore((state)=>state.setIsAuthFalse)
  const navigate=useNavigate()










  const setLinkActive=(item)=>{
   
   setLinkProperty(links.map(element=>{
    return element===item?{...element,clicked:true}:{...element,clicked:false}
    
   }))

   

  
  }






  const LogOut = () => {
    localStorage.removeItem('token')
    setIsAuthFalse()
    
    
    
      
     
  }
  



  return (
    <div className='MainMenu'>
    <div className="userOptions">
       
        <div className="userInfo">
          <img src={userIcon}/> {sessionStorage.getItem("name")}{" "}
          {sessionStorage.getItem("second_name")}
        </div>
        <button onClick={LogOut}>Выйти</button>
      </div>
       <h2>Категории</h2>
       <ul>
        {links.map((item,index)=>{
            return <li 
            onClick={()=>{setLinkActive(item); setLink(item.category)}}
            className={item.clicked?"clicked":null} 
            key={index}>
            {item.trancrypt}
            </li>
        })}
       </ul>
    </div>
  )
}
