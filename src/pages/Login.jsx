import React from 'react';
import Template from '../components/Common/Template';
import loginImg from "../assets/Images/login.webp";
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { useEffect } from 'react';

function Login() {
  const {token} = useSelector(state=>state.auth)
  const navigate = useNavigate()
  useEffect(()=>{
    if(token){
      console.log(token)
      navigate('/dashboard/my-profile')
    }
  },[])
  

  return (
    <Template
      title="Welcome Back"
      desc1="Build skills for today, tomorrow, and beyond."
      desc2="Education to future-proof your career."
      image={loginImg}
      formType="login"
      
    />
  );
}

export default Login;
