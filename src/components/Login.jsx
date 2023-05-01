import React, { useEffect } from "react";
import lockSvg from "../assets/lock.svg";
import eye from "../assets/eye.svg";
import eyeClosed from "../assets/eye-closed.svg";
import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import axios from "axios";
import Loader from "./Loader";
import useStore from '../Store/store'





export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isPswShow, setIsPswShow] = useState(false);
  const [desctext, setDesctext] = useState("");
  const [validateError, setValidateError] = useState(false);
  const [isRemember, setIsRemember] = useState(false);
  const [isLodaing, setisLoading] = useState(false);
  const navigate = useNavigate();
  const setIsAuthTrue=useStore((state)=>state.setIsAuthTrue)
  const setUserCart=useStore((state)=>state.setUserCart)
  
  
 
  



  const handleSubmit = (e) => {
    e.preventDefault();
    if (password !== "" && email !== "") {
      LoginUser();
      
    } else {
      setDesctext("Заполните все поля");
      setValidateError(true);
    }
  };


  const LoginUser = async () => {
    
    try {
      setisLoading(true);
      const response = await axios.post(
        "http://localhost:5000/login",
        {
          email: email,
          password: password,
        },
        {
          headers: { "Content-Type": "application/json" },
        }
      );



      console.log(response)
      setisLoading(false);
      setIsAuthTrue()
      localStorage.setItem("token", response.data.token);
      sessionStorage.setItem("name", response.data.name);
      sessionStorage.setItem("second_name", response.data.second_name);

      if (isRemember) {
        localStorage.setItem("email", email);
        localStorage.setItem("password", password);
      }

      response.data.isAdmin?navigate('/admin-dashboard'):navigate('/main')
      setUserCart(response.data.userCart)
     
    } 



    catch (error) {
      console.error(error);
      setisLoading(false);

      if (error.response.status === 404) {
        setDesctext("Пользователь не найден");
      }
      
      if(error.response.status===401){
        setDesctext("Ошибка логина или пароля");
        setValidateError(true)
      }
      
     

    }
  };






  useEffect(() => {
    const email = localStorage.getItem("email");
    const password = localStorage.getItem("password");
    if (password && email) {
      setEmail(email);
      setPassword(password);
    }
  }, []);







  return isLodaing ? (
    <Loader />
  ) : (
    <div style={{ height: 500 }} className="AuthForm">
      <form>
        <div className="lock">
          <img alt="#" src={lockSvg} />
        </div>
        <div style={{ color: 'red' }} className="errorText">
          {desctext}
        </div>

        <div className="inputGroup" style={{ margin: 0 }}>
          <input
            className={validateError && "validateError" }
            onChange={(e) => {
              setEmail(e.target.value);
              setDesctext("");
              setValidateError(false);
            }}
            value={email}
          />
          <label className={email && "filled"}>Email</label>
        </div>
        <div className="inputGroup">
          <input
            className={validateError && "validateError"}
            onChange={(e) => {
              setPassword(e.target.value);
              setDesctext("");
              setValidateError(false);
            }}
            value={password}
            type={isPswShow ? "text" : "password"}
          />
          <label className={password && "filled"}>Пароль</label>
          <div
            onClick={() => {
              setIsPswShow(!isPswShow);
            }}
            className="showPass"
          >
            <img alt="#" src={isPswShow ? eyeClosed : eye} />
          </div>
        </div>

        <div
          style={{
            width: "90%",
            display: "flex",
            alignItems: "center",
            marginTop: 40,
          }}
        >
          <input
            name="checkbox"
            type="checkbox"
            style={{
              margin: 0,
              width: 18,
              height: 18,
              cursor: "pointer",
            }}
            checked={isRemember}
            onChange={() => {
              setIsRemember(!isRemember);
            }}
          />
          <label
            style={{ marginLeft: 5, fontSize: 14, color: "#4e73df" }}
            
          >
            Запомнить меня
          </label>
        </div>

        <div className="action_options">
          <div>
            <Link to="/register">Все еще нет аккаунта?</Link>
            <Link to='/password-reset'>Забыли пароль?</Link>
          </div>
          <button onClick={handleSubmit}>Войти</button>
        </div>
      </form>
    </div>
  );
}
