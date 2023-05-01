import React from 'react'
import { useNavigate } from 'react-router-dom'

export default function DashboardHeader() {
  
 const navigate=useNavigate()


 const handleChange=(e)=>{
   switch(e.target.value){
    case 'Обзор':
    navigate('/admin-dashboard/')
    break;
    case 'Добавить элемент':
      navigate('/admin-dashboard/add-item') 
   }
   
 }



 const logOut=()=>{
  localStorage.removeItem('token')
  navigate('/')
 }

 return (
    <header>
    <div className='logo'>
       Dashboard
    </div>
        <nav>
           <select onChange={handleChange}>
             <option>Обзор</option>
             <option>Добавить элемент</option>
           </select>
        </nav>

        <button onClick={logOut}>Выйти</button>
    </header>
  )
}
