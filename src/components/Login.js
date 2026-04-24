import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { ToastContainer } from 'react-toastify';
import { handleError, handleSuccess } from './utils';

function Login() {
    const navigate = useNavigate();

    const [loginData,setLoginData] = useState({
        username:"",
        password:""
    })

    const onChangeInput = (event) => {
        const {name,value} = event.target;
        console.log(name,value)
        const loginDetails = {...loginData};
        loginDetails[name] = value
        setLoginData(loginDetails)
    }

    const onSubmitLoginForm = async (event) => {
        event.preventDefault()
        const {username,password} = loginData
        if (!username ||  !password){
            return handleError("Username, email and password are required")
        }
        try {
            const url = "https://nav-backend.onrender.com/auth/login"
            const response = await fetch(url,{
                method:"POST",
                headers:{
                    "Content-Type": "application/json"
                },
                body:JSON.stringify(loginData),
                mode:"cors"

            })
            const result = await response.json()
            console.log(result)
            const {message,success,jwtToken,username} = result
             if (success){
                handleSuccess(message);
                localStorage.setItem("token",jwtToken);
                localStorage.setItem("loggedInUser", username)
                setTimeout(() => {
                    navigate("/home")

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
      <h1>Login</h1>
      <form onSubmit={onSubmitLoginForm}>
        <div>
            <label htmlFor='username'>Username</label>
            <input onChange={onChangeInput} type="text" name="username" id ="username" placeholder='Enter username' value={loginData.name}/>
        </div>
        <div>
            <label htmlFor='password'>Password</label>
            <input onChange={onChangeInput} type="password" name="password" id ="password" placeholder='Enter password'value={loginData.name}/>
        </div><br/>
        <button type="submit">Login</button><br/>
        <span>Create an account ? <Link to="/signup">Signup</Link></span>
      </form>
      <ToastContainer/>
    </div>
  )
}

export default Login
