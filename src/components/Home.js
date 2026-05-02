import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import { handleSuccess,handleError } from './utils';

function Home() {
const [loggedInUser,setLoggedInUser] = useState("");
const [userData, setUserData] = useState([]);


const navigate = useNavigate();
useEffect(() => {
  setLoggedInUser(localStorage.getItem("loggedInUser"))
  const fetchUserData = async () => {
    try {
      const url = "https://nav-backend.onrender.com/auth/home"
      const response = await fetch(url,{
        method:"GET",
        headers: {
          "Authorization": `Bearer ${localStorage.getItem("token")}`
        }
      });
      const data = await response.json();
      const {message,success} = data
      if (success){
        handleSuccess(message)
        setUserData(data.data)
      }
    } catch (error) {
      handleSuccess("Error fetching user data");
    }
  }
  fetchUserData();
},[])

const onDeleteUser = async (id) => {
  try {
    const url = `https://nav-backend.onrender.com/auth/delete/${id}`
    const response = await fetch(url,{
      method:"DELETE",
      headers: {
        "Authorization": `Bearer ${localStorage.getItem("token")}`
      }
    })
    const data = await response.json();
    const {message,success} = data
    if (success){
      handleSuccess(message)
      // Remove the deleted user from the userData state
      setUserData(userData.filter(user => user._id !== id))
    }
  } catch (error) {
    handleError("Error deleting user");
  }
}

  const onClickLogout = () => {
    localStorage.removeItem("token")
    localStorage.removeItem("loggedInUser")
    handleSuccess("User loggedOut");
    setTimeout(() => {
      navigate("/login")
    },1000)

  }
  return (
    <div className='home-container'>
      <div className='home-header'>
        <h1 className='username'>Welcome, {loggedInUser}</h1>
        <button className='logout-btn' type="button" onClick={onClickLogout}>Logout</button>
      </div>
      <div>
        <div className='user-section'>
          <h2 className='section-title'>All Users</h2>
        {userData.length > 0 ? (
          <ul className='user-list'>
            {userData.map((user) => (
              <li key={user._id} className='user-card'>
                <div className='user-info'>
                  <span className='user-username'>{user.username}</span>  
                  <span className='user-email'>{user.email}</span>
                </div>
                <button className='delete-btn' type="button" onClick={() => onDeleteUser(user._id)}>Delete</button>
              </li>
            ))}
          </ul>
        ) : (
          <p>No users found.</p>
        )}
      </div>
      <ToastContainer/>
        </div>
    </div>
  )
}

export default Home
