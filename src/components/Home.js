import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import { handleSuccess } from './utils';

function Home() {
const [loggedInUser,setLoggedInUser] = useState("");
const navigate = useNavigate();
useEffect(() => {
  setLoggedInUser(localStorage.getItem("loggedInUser"))
},[])

  const onClickLogout = () => {
    localStorage.removeItem("token")
    localStorage.removeItem("loggedInUser")
    handleSuccess("User loggedOut");
    setTimeout(() => {
      navigate("/login")
    },1000)

  }
  return (
    <div>
      <h1>{loggedInUser}</h1>
      <button type="button" onClick={onClickLogout}>Logout</button>
    </div>
  )
}

export default Home
