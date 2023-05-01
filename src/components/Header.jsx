import React from "react";
import CartImg from '../assets/Cart.svg'
import useStore from "../Store/store";
import { useNavigate } from "react-router-dom";





export default function Header() {

  
  const navigate=useNavigate()
  const userCartLength=useStore((state)=>state.userCart.length)
    
  
    




  return (
    <header>
      <div onClick={()=>{navigate('/main')}} className="logo">OnlineStore</div>
       <div onClick={()=>{navigate('userCart')}} className="Cart"><img src={CartImg}/><div className="cartItemsAmount">{userCartLength}</div></div>
      
    </header>
  );
}
