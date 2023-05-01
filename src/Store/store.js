import {create} from  'zustand'
import { persist, createJSONStorage } from 'zustand/middleware'




const useStore=create(
    persist(
        (set,get)=>({
            isAuth:false,
            userCart:[],
            setIsAuthTrue:()=>set(()=>({isAuth:true})),
            setIsAuthFalse:()=>set(()=>({isAuth:false})),
            setUserCart:(userCart)=>set(()=>({userCart:userCart})),
            
           
           
            
            
        }),
        
        {
            name:'main-storage',
            storage:createJSONStorage(()=>localStorage)
        }
    )
)







export default useStore;