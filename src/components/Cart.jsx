import axios from 'axios'
import React, { useEffect, useState } from 'react'
import useStore from '../Store/store'

export default function Cart() {
  const userCart=useStore((state)=>state.userCart)
  const setUserCart=useStore((state)=>state.setUserCart)
  const [count,setCount]=useState()



 
 /*const callApi=async()=>{
    const token=localStorage.getItem('token')
    try{
        const responce=await axios.get('http://localhost:5000/get-cart-items',{
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${token}`
            },
        })

        setItems(responce.data)
        console.log(responce.data)
    }

    catch(error){
        console.error(error)
    }
 }
 */





 const increment=(index)=>{

   if(userCart[index].orderedQuantity<userCart[index].quantity){
    userCart[index].orderedQuantity++
    setCount(userCart[index].orderedQuantity)
    setUserCart(userCart)
   }
   
 }



 const decrement=(index)=>{
     
  if(userCart[index].orderedQuantity>0){
    userCart[index].orderedQuantity--
    setCount(userCart[index].orderedQuantity)
    setUserCart(userCart)
   }
    
 }






 const removeItemFromCart=(removedItem)=>{
  const filteredCart=userCart.filter(currentItem=>currentItem!==removedItem)
  setUserCart(filteredCart)
 }






  return (
    <div className='Cart'>
      <div className='cartItems'>
       {userCart.map((item,index)=>{
        return <div className='itemInfo' key={index}>
        <span style={{backgroundImage:`url(${item.img_URL})`}}></span> 
        {item.name}
        <div className='quantityBtns'>
          <button onClick={()=>{decrement(index)}}>-</button>

          {item.orderedQuantity}
          
          <button onClick={()=>{increment(index)}}>+</button>
        </div>
        <button className='deleteBtn' onClick={()=>{removeItemFromCart(item)}}>Удалить</button>
        </div>
       })}
      </div>
    </div>
  )
}
