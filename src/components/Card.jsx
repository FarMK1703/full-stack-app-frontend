import React from "react";
import { useNavigate } from "react-router-dom";


export default function Card({articul,name,price,img_URL,likes,isAdmin,quantity}) {
  const navigate=useNavigate()



  return (
    <div className="Card">
      <img src={img_URL} />
      <div className="description">
      <h1>{name}</h1>
      <h2>В наличии: {quantity}</h2>
     
      {isAdmin?
      <div className="buttonGroup">
        <button>Редактировать</button>
        <button>Удалить</button>
      </div>
      :
      <div className="buttonGroup">
        
        <button onClick={()=>{navigate(`full-view/${articul}`)}}>Узнать больше</button>
        <button>{price}$</button>
      </div>}
      </div>
    </div>
  );
}
