import React,{useEffect, useState} from 'react'
import { useParams,useNavigate } from 'react-router-dom'
import axios from 'axios'
import Loader from './Loader'
import InfoMark from '../assets/info-mark.svg'
import BagImg from '../assets/Bag.svg'
import useStore from '../Store/store'


export default function FullView() {
  const {articul}=useParams()
  const [isLoading,setIsLoading]=useState(false)
  const navigate=useNavigate()
  const [item,setItem]=useState({})
  const token = localStorage.getItem("token");
  const userCart=useStore((state)=>state.userCart)
  const setUserCart=useStore((state)=>state.setUserCart)
  
  





 const addToCart = (item) => {
   item.orderedQuantity=1
   userCart.push(item)
   setUserCart(userCart)
  


 }


  const getPostApi=async()=>{
   
    try {
       setIsLoading(true) 
       const response=await axios.get(`http://localhost:5000/get-single-post/?articul=${articul}`, {
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${token}`
            },
        });


    
       setItem(response.data)
       setIsLoading(false)

       
    } catch (error) {
        if(error.response.status===404){
            console.log('Ничего не найдено')
        }
        navigate('/')
       
    }
  }





  useEffect(()=>{
    getPostApi()
  },[])


  return isLoading?

  <div style={{width:'100%',height:'100%',display:'flex',alignItems:'center',justifyContent:'center'}}>
  <Loader/>
 </div>
  :
  (
    <div className='FullView'>
        <h1>{item.name}</h1>
        <div className='itemProperties'>
            <div><img className='itemImg' src={item.img_URL}/></div>
            <div className='characteristics'>
                <ul>
                    <li>Цвет: </li>
                    <li>Материал:</li>
                    <li>ОС:</li>
                    <li>Версия Wi-Fi:</li>
                </ul>
                <div className='chooseColorButtons'>
                    <button></button>
                    <button></button>
                    <button></button>

                </div>
            </div>
            <div className='optionButtons'>
             <div>
             <h3>{item.price}$</h3>
             <p><span>Информация о доставке <img src={InfoMark}/></span><br/><br/>Доставка от 2 часов до двух рабочих дней. Исходя из локации доставки</p>
             <p>Скидка 10% при первой покупке</p>
             <p>При покупке до 20-го мая получите <span>Mi Band 7</span> бесплатно</p>
             </div>
             <button onClick={()=>{addToCart(item)}}>Добавить в корзину <img src={BagImg}/></button>
              

            </div>
        </div>
        <div className='itemDescription'>
            <h2>Описание</h2>
             <div className='descriptionText'>{item.description}</div>
        </div>


        <div className='comments'>

        </div>
    </div>
  )
}
