import React from "react";
import { Link, useNavigate } from "react-router-dom";
import lockSvg from "../assets/lock.svg";
import eye from '../assets/eye.svg';
import eyeClosed from '../assets/eye-closed.svg'
import { useState } from "react";
import axios from "axios";
import Loader from "./Loader";


export default function Register() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState('');
  const [second_name, setSecondName] = useState('')
  const [passwordCheck, setPasswordCheck] = useState("");
  const [isPswShow, setIsPswShow] = useState(false)
  const [validateError, setValidateError] = useState(false);
  const [desctext, setDesctext] = useState("");
  const [isLodaing, setisLoading] = useState(false);
  const [descTextColor, setDescTextColor] = useState("red");
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (password !== "" && email !== "" && passwordCheck !== "" && name!=="" && second_name!=="") {
      if (password !== passwordCheck) {
        setValidateError(true);
        setDesctext("Пароли не совпадают");
      } else {
        registerUser();
      }
    } else {
      setDesctext("Заполните все поля");
      setValidateError(true);
    }
  };

  const registerUser = async () => {
    try {
      setisLoading(true);
      await axios.post(
        "http://localhost:5000/register",
        {
          email: email,
          password: password,
          name: name,
          second_name: second_name
        },
        {
          headers: { "Content-Type": "application/json" },
        }
      );
      setisLoading(false);
      setDescTextColor("green");
      setDesctext("Пользователь успешно создан");
      
      setTimeout(() => {
        
        navigate("/");
      }, 1500);
      
    }
    
    
    catch (error) {
      console.log(error.code);
      if (error.code) {


        if (error.response.data.message === "User is already exist") {
          setDesctext("email уже занят");
          setDescTextColor("red");
        } else if (error.response.data.message === "Server error") {
          setDesctext("Ошибка сервера");
          setDescTextColor("red");
        }
      }
      
      
      
      else {
        setDesctext("Нет связи с сервером");
        setDescTextColor("red");
      }
      setisLoading(false);
    }
  };

  return isLodaing ? (
    <Loader />
  ) : (
    <div className="AuthForm">
      <form>
        <div className="lock">
          <img alt="#" src={lockSvg} />
        </div>
        <div style={{ color: descTextColor }} className="errorText">
          {desctext}
        </div>
        <div className="inputGroup" style={{ margin: 0 }}>
          <input
            className={validateError && "validateError"}
            onChange={(e) => {
              setEmail(e.target.value);
              setDesctext("");
              setValidateError(false);
            }}
            value={email}
            type="email"
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
        <div className="inputGroup">
          <input
            className={validateError && "validateError"}
            onChange={(e) => {
              setPasswordCheck(e.target.value);
              setDesctext("");
              setValidateError(false);
            }}
            value={passwordCheck}
            type={isPswShow ? "text" : "password"}
          />
          <label className={passwordCheck && "filled"}>Повторите пароль</label>
        </div>
        <div className="inputGroup">
          <input
            className={validateError && "validateError"}
            onChange={(e) => {
              setName(e.target.value);
              setDesctext("");
              setValidateError(false);
            }}
            value={name}
          />
          <label className={name && "filled"}>Имя</label>
        </div>
        <div className="inputGroup">
          <input
            className={validateError && "validateError"}
            onChange={(e) => {
              setSecondName(e.target.value);
              setDesctext("");
              setValidateError(false);
            }}
            value={second_name}
          />
          <label className={second_name && "filled"}>Фамилия</label>
        </div>
        <div className="action_options">
          <div>
            <Link to="/">Уже есть аккаунт?</Link>
          </div>
          <button onClick={handleSubmit}>Регистрация</button>
        </div>
      </form>
    </div>
  );
}
