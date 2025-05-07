import React, { useState } from 'react'
import { useContext } from 'react';
import {ShopDataContext} from '../context/ShopContext'
import axios from 'axios'
import { toast } from 'react-toastify';
import { useEffect } from 'react';

const Login = () => {

  const [currentState, setCurrentState] = useState('Sign Up');
  const{token, setToken,navigate,backendUrl} = useContext(ShopDataContext);

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('')

  const submitHandller = async(e)=>{
     e.preventDefault();
     try {
        if(currentState === 'Sign Up'){
           const response = await axios.post(`${backendUrl}/api/users/register`,{name,email,password})
          
           if(response.data.success){
              setToken(response.data.token);
              localStorage.setItem('token',response.data.token);
              navigate('/');
           }
           else{
             toast.error(response.data.message)
           }
        }
        else{
          const response = await axios.post(`${backendUrl}/api/users/login`,{email,password})
  
          if(response.data.success){
             setToken(response.data.token)
             localStorage.setItem('token',response.data.token)
          }else{
             toast.error(response.data.message)
          }
        }
     } catch (error) {
       console.log(error)
       toast.error(error.message)
     }
  }
 
   useEffect(()=>{
     if(token){
      navigate('/')
     }
   },[token,navigate])
  return (
    <form onSubmit={submitHandller} className='flex flex-col items-center w-[90%] sm:max-w-96 m-auto mt-14 gap-4 text-gray-400'>
      <div className='inline-flex items-center gap-2 mb-2 mt-10'>
          <p className='prata-ragular text-3xl'>{currentState}</p>
          <hr className='border-none h-[1.5px] w-8 bg-gray-800 '/>
      </div>
      {currentState === "Login" ? "": <input
      value={name}
       onChange={(e)=>setName(e.target.value)}
       type="text" className='w-full px-3 py-2 border rounded-md border-gray-800 ' placeholder='name' required/>} 
      <input 
      value={email}
       onChange={(e)=>setEmail(e.target.value)}
      type="email" className='w-full px-3 py-2 border rounded-md  border-gray-800 ' placeholder='email' required/>
      <input 
      value={password}
      onChange={(e)=>setPassword(e.target.value)}
      type="password" className='w-full px-3 py-2 border rounded-md  border-gray-800 ' placeholder='password' required/>
      <div className='w-full flex justify-between text-sm mt-[-8px]'>
        <p className='cursor-pointer'>Forgot Your Password?</p>
        {
          currentState === "Sign Up" ? <p onClick={()=>setCurrentState("Login")} className='cursor-pointer'>Already have an account?</p>
          :<p onClick={()=>setCurrentState("Sign Up")} className='cursor-pointer'>Create an account</p>
        }
      </div>
      <button className='bg-black text-white font-light px-8 py-2 mt-4'>{currentState === 'Sign Up' ? 'Sign Up' : 'Sign In'}</button>
    </form>
  )
}

export default Login