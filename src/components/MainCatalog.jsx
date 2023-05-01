import React,{useState} from 'react'
import MainMenu from "./MainMenu";
import Catalog from "./Catalog";


export default function MainCatalog() {

const [linkType,setLinkType]=useState('smartphone')


const setLink=(link)=>{
    setLinkType(link)
  }
  return (
    <>

    <div className="ContentWrapper">
       <MainMenu
        setLink={setLink}
       />
       <Catalog
        linkType={linkType}
       />
    </div>
    </>
  )
}
