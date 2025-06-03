import React, { useContext, useEffect, useState } from 'react'
import { ShopContext } from '../context/ShopContext';
import axios from 'axios'
import { toast } from 'react-toastify';

const Login = () => {

  // When user will open it default page should be login
  const [currentState , setCurrentState] = useState('Login');

  const {token,setToken,navigate,backendUrl} = useContext(ShopContext)

  const [name,setName] = useState('')
  const [password,setPassword] = useState('')
  const [email,setEmail] = useState('')

  //To handle submit on submit button
  const onSubmitHandler = async (event) =>{
    event.preventDefault();

    try {

       if(currentState === 'Sign Up'){
        const response = await axios.post(backendUrl+'/api/user/register',{name,email,password})
        //console.log(response.data); Working

        if(response.data.success)
        {
          setToken(response.data.token)
          localStorage.setItem('token',response.data.token)
        }
        else 
        {
           toast.error(response.data.message)
        }
        
       }
       else // User is going to be logging
       {
        const response = await axios.post(backendUrl+'/api/user/login',{email,password})
        //console.log(response.data); //working
        if(response.data.success){
          setToken(response.data.token)
          localStorage.setItem('token',response.data.token)
        }
        else {
          toast.error(response.data.message)
        }

        
       }
      
    } catch (error) {
       console.log(error);
       toast.error(error.message)
    }

  }
  
  // Now when user will be logged in , it will be redirected to the home-page
  useEffect(()=>{
    if(token){ // If token is available then we will navigate to the home page
      navigate('/') // Now you will be navigated to the home page , but you are not able to come-back to login page
    }
  },[token])

  useEffect( ()=>{

    // If token is not available and in local storage token is available in that 
    // case we will store that local storage token in token variable state
    if(!token && localStorage.getItem('token'))
      setToken(localStorage.getItem('token'))

  } , [] )

  return (
     <form  onSubmit={onSubmitHandler} className='flex flex-col items-center w-[90%] sm:max-w-96 m-auto mt-14 gap-4 text-gray-800 ' >
        <div className='inline-flex items-center gap-2 mg-2 mt-10 ' >
          <p className='prata-regular text-3xl' >{currentState}</p>
          <hr className='border-none h-[1.5px] w-8 bg-gray-800 '  />
        </div> 
        { currentState==='Login' ? '' : <input type="text" onChange={(e)=>setName(e.target.value) }  value={name} className='w-full px-3 py-2 border border-gray-800' placeholder='Name'  required/> }  
        <input type="email" onChange={(e)=>setEmail(e.target.value)} value={email}  className='w-full px-3 py-2 border border-gray-800' placeholder='Email'  required/>
        <input type="password" onChange={(e)=>setPassword(e.target.value)} value={password} className='w-full px-3 py-2 border border-gray-800' placeholder='Password'  required/>

        <div className='w-full flex justify-between text-sm mt-[-8px]' >
          
           <p  className='cursor-pointer' >Forget Password ?</p>
           {
             currentState==='Login'
             ? <p onClick={()=>setCurrentState('Sign Up')}  className='cursor-pointer' >Create Account</p>
             : <p onClick={()=>setCurrentState('Login')}  className='cursor-pointer' >Login Here</p>
           }
          

        </div>

        <button className='bg-black text-white font-light px-8 py-2 mt-4' > {currentState === 'Login' ? 'Sign In' : 'Sign Up'}  </button>

     </form>
  )
}

export default Login
