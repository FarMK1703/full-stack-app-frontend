import React from "react";
import { useState } from "react";

export default function PassReset() {
  const [isSended, setIsSended] = useState(false);
  const [email, setEmail] = useState("");

  const handleSendingEmail = (e) => {
    e.preventDefault();
  };

if(isSended){
    return (<></>)
}


else{
    return(
        <div style={{height:0}} className="AuthForm">
          <form onSubmit={handleSendingEmail}>
          <p style={{marginBottom:50,textAlign:'center'}}>Для сброса пароля введите email, который использовали при регистрации.
           Мы пришлем на него код поддверждения</p>
            <div className="inputGroup">
                <input
                    value={email}
                    onChange={(e)=>{setEmail(e.target.value)}}
                />
                <label className={email&&'filled'}>email</label>
                <button type="submit" style={{marginTop:20}}>Отправить</button>
            </div>
          </form>
        </div>
    )
}

}