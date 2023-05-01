import React, { useEffect } from 'react'
import { Navigate } from 'react-router-dom'
import useStore from '../Store/store'



export default  function ProtectedRoute({children}) {
    //const isAuth=useSelector((state)=>state.isAuth.value)
  const isAuth=useStore((state)=>state.isAuth)  

  if(!isAuth){
    {console.log(isAuth)}
    return <Navigate to='/' replace/>
    
  }

  return (
  <> 
    {console.log(isAuth)}
    {children}
  
  </>
  )


}
