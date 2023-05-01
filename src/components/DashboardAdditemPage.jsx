import axios from 'axios'
import { useEffect, useState } from 'react'
import React from 'react'
import Loader from './Loader'
import { useNavigate } from 'react-router-dom'

export default function DashboardAdditemPage() {
  
  const [articul,setArticul]=useState('')
  const [name,setName]=useState('')
  const [price,setPrice]=useState('')
  const [category,setCategory]=useState('smartphone')
  const [quantity,setQuantity]=useState('')
  const [description,setDescription]=useState('')
  const [isLoading,setIsLoading]=useState(false)
  const [isShowAlert,setIsShowAlert]=useState(false)
  const [img_URL,setImgURL]=useState('')
  const navigate=useNavigate()
 
 




 





  const callAddPostApi=async (e)=>{
    e.preventDefault()
    try{
        setIsLoading(true)
        const token=localStorage.getItem('token')
        const response=await axios.post('http://localhost:5000/admin-dashboard/add-post',{
            
          articul:articul,
          name:name,
          price:price,
          description:description,
          type:category,
          img_URL:img_URL


        },
        {
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${token}`
            },
        })

        setIsLoading(false)
        setIsShowAlert(true)
        setTimeout(()=>{
            setIsShowAlert(false)
        },500)
    }

    catch(error){
        console.log(error)
        setIsLoading(false)
        
    }
    
    
  }
  

  if(isShowAlert){
    return (
           <div className='ItemAlertWrapper'>
                 <div className='addItemAlert'>
                    Успешно добавлено
                 </div>
           </div>
    )
  }



  return (
    <div className='AddItem'>
    {

        isLoading?

        <Loader/>
        :
        <form onSubmit={callAddPostApi}>
        <h1>Добавление товара</h1>
            <div className='inputGroup'>
                <label>Артикул:</label>
                <input value={articul} onChange={(e)=>{setArticul(e.target.value)}}/>
            </div>
            <div className='inputGroup'>
                <label >Назввание:</label>
                <input value={name} onChange={(e)=>{setName(e.target.value)}}/>
            </div>
            <div className='inputGroup'>
                <label >Цена:</label>
                <input type="number" value={price} onChange={(e)=>{setPrice(e.target.value)}}/>
            </div>
            <div className='inputGroup'>
                <label>Количество:</label>
                <input value={quantity} onChange={(e)=>{setQuantity(e.target.value)}} type='number'/>
            </div>
            <div className='inputGroup'>
                <label>Категория:</label>
                <select  onChange={(e)=>{setCategory(e.target.value)}}>
                    <option value='smartphone'>Смартфоны</option>
                    <option value='computer'>Компьютеры</option>
                    <option value='forHome'>Бытовая техника</option>
                </select>
            </div>
            <div className='inputGroup'>
                <label>URL изображения:</label>
                <input value={img_URL} onChange={(e)=>{setImgURL(e.target.value)}}/>
            </div>
            <div className='inputGroup'>
                <label>Описание:</label>
                <textarea value={description} onChange={(e)=>{setDescription(e.target.value)}}/>
            </div>

            <button type='submit'>Добавить</button>
            
        </form>
        }
    </div>
  )
}
