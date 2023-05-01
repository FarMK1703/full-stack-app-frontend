import React, { useEffect,useState } from 'react'
import axios from 'axios';
import Loader from './Loader';
import Card from './Card';
import { useNavigate } from 'react-router-dom';


export default function DashboardOverviewPage() {
 const [linkType,setLinkType]=useState('smartphone')
 const [posts,setPosts]=useState('')
 const [isLoading,setIsLoading]=useState(false)
 


 
  const callGetPostsApi=async ()=>{
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
           console.log(response)
           setIsLoading(false)
           
    
           
        } catch (error) {
           
            console.log(error)
     }
  }


   useEffect(()=>{
    callGetPostsApi()
   },[])





  return isLoading?
   <div style={{width:'100%',height:'100%',display:'flex',alignItems:'center',justifyContent:'center'}}>
    <Loader/>
   </div>
  :
  <div className='DashboardOverview'>
        {posts && posts.map((item,index)=>{
          return  <Card
            name={item.name}
            price={item.price}
            img_URL={item.img_URL}
            likes={item.likes}
            isAdmin={true}
            quantity={item.quantity}
            key={index}

            />
           
          
        })}
    </div>
    
  
}
