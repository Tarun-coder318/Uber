// import React from 'react'
// import axios from 'axios'
// import { useNavigate } from 'react-router-dom'


// const UserLogout = () => {
//     const token = localStorage.getItem("token")
//     const  navigate = useNavigate()

//     axios.get(`${import.meta.env.VITE_BASE_URL}/users/logout`,{
//         headers:{
//             Authorization: `Bearer ${token}`
//         }
//     }).then((response) => {
//         if(response.status === 200){
//             localStorage.removeItem("token")
//             navigate("/login")
//         }
//     }).catch((error) => {
//         console.log(error);
//     })
            
//   return (
//     <div>
      
//     </div>
//   )
// }

// export default UserLogout
import React, { useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const UserLogout = () => {
    const navigate = useNavigate();

    useEffect(() => {
        const token = localStorage.getItem("token");

        const logout = async () => {
            try {
                await axios.get(`${import.meta.env.VITE_BASE_URL}/users/logout`, {
                    headers: { Authorization: `Bearer ${token}` }
                });
            } catch (error) {
                console.error("Logout failed:", error);
            } finally {
                localStorage.removeItem("token"); // ✅ Clear token even if API fails
                navigate("/login"); // ✅ Redirect to login
            }
        };

        logout();
    }, [navigate]); // ✅ Runs only once when component mounts

    return <div>Logging out...</div>;
};

export default UserLogout;
