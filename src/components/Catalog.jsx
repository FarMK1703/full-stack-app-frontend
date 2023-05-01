import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import Card from './Card';
import Loader from './Loader';
import useStore from '../Store/store';

export default function Catalog({linkType}) {
  const [posts,setPosts]=useState([])
  const [isLoading,setIsLoading]=useState(false)
  const [isNotFound,setIsNotFound]=useState(false)
  const setIsAuthFalse=useStore((state)=>state.setIsAuthFalse)



   const getPosts= async ()=>{
        setIsNotFound(false)
        const token = localStorage.getItem("token");
        try {
           setIsLoading(true) 
           const response=await axios.get(`http://localhost:5000/get-posts/?type=${linkType}`, {
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${token}`
                },
            });


           setPosts(response.data)
           setIsLoading(false)
    
           
        } catch (error) {
            if(error.response.status===404){
                setIsLoading(false)
                console.log('Ничего не найдено')
                setIsNotFound(true)

            }
            else{
              setIsAuthFalse()
            }
            
            
           
        }
     }


 useEffect(()=>{
   getPosts()
   
 },[linkType])

  

  if(isLoading){
    return (
    
    <div style={{width:'80%',height:'100%',display:'flex',alignItems:'center',justifyContent:'center'}}>
        <Loader/>
    </div>

    )
  }


  if(isNotFound){
    return (
      <div style={{width:'80%',textAlign:'center','fontSize':'20px'}}>Ничего не найдено</div>
    )
  }



  return (
    <div className='Catalog'>
      {posts.map((item,index)=>{
       return <Card
            name={item.name}
            description={item.description}
            price={item.price}
            articul={item.articul}
            img_URL={item.img_URL}
            likes={item.likes}
            quantity={item.quantity}
            key={index}
        />
      })}
    </div>
  )
}
