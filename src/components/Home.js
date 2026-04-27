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
    handleSuccess("Error deleting user");
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
    <div>
      <h1>{loggedInUser}</h1>
      <button type="button" onClick={onClickLogout}>Logout</button>
      <div>
        <h2>All Users</h2>
        {userData.length > 0 ? (
          <ul>
            {userData.map((user) => (
              <li key={user._id}>
                <strong>{user.username}</strong> - {user.email}
                <button type="button" onClick={() => onDeleteUser(user._id)}>Delete</button>
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
