import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import { handleSuccess } from './utils';

function Home() {
const [loggedInUser,setLoggedInUser] = useState("");
const [userData, setUserData] = useState([]);


const navigate = useNavigate();
useEffect(() => {
  setLoggedInUser(localStorage.getItem("loggedInUser"))
  const fetchUserData = async () => {
    try {
      const url = "https://nav-backend.onrender.com/auth/home"
      const response = await fetch(url);
      const data = await response.json();
      const {message,success} = data
      if (success){
        setUserData(data.data)
        handleSuccess(message)
      }else if (!success){
        handleSuccess(message)
      }
    } catch (error) {
      console.error("Error fetching user data:", error);
      handleSuccess("Error fetching user data");
    }
  }
  fetchUserData();
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
      <div>
        <h2>All Users</h2>
        {userData.length > 0 ? (
          <ul>
            {userData.map((user) => (
              <li key={user._id}>
                <strong>{user.name}</strong> - {user.email}
              </li>
            ))}
          </ul>
        ) : (
          <p>No users found.</p>
        )}
      </div>
    </div>
  )
}

export default Home
