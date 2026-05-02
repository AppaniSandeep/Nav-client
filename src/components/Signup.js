import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { ToastContainer } from 'react-toastify';
import { handleError, handleSuccess } from './utils';

function Signup() {
    const navigate = useNavigate();

    const [signupData,setSignupData] = useState({
        username:"",
        email:"",
        password:""
    })

    const onChangeInput = (event) => {
        const {name,value} = event.target;
        const signupDetails = {...signupData};
        signupDetails[name] = value
        setSignupData(signupDetails)
    }

    const onSubmitSignForm = async (event) => {
        event.preventDefault()
        const {username,email,password} = signupData
        if (!username || !email || !password){
            return handleError("Username, email and password are required")
        }
        try {
            const url = "https://nav-backend.onrender.com/auth/signup"
            const response = await fetch(url,{
                method:"POST",
                headers:{
                    "Content-Type": "application/json"
                },
                body:JSON.stringify(signupData),
                mode:"cors"

            })
            const result = await response.json()
            const {message,success} = result
             if (success){
                handleSuccess(message);
                setTimeout(() => {
                    navigate("/login")

                },1000)
             }else if (!success){
                handleError(message);
             }

        }catch(e){
            handleError(e)
        }
    }
   return (
    <div className='container'>
      <h1>Signup</h1>
      <form onSubmit={onSubmitSignForm}>
        <div>
            <label htmlFor='username'>Username</label>
            <input onChange={onChangeInput} type="text" name="username" id ="username" placeholder='Enter username' value={signupData.username}/>
        </div>
        <div>
            <label htmlFor='email'>Email</label>
            <input onChange={onChangeInput} type="email" name="email" id ="email" placeholder='Enter email'value={signupData.email}/>
        </div>
        <div>
            <label htmlFor='password'>Password</label>
            <input onChange={onChangeInput} type="password" name="password" id ="password" placeholder='Enter password'value={signupData.password}/>
        </div><br/>
        <button type="submit">Signup</button><br/>
        <span>Already have an account ? <Link to="/login">Login</Link></span>
      </form>
      <ToastContainer/>
    </div>
  )
}

export default Signup
