import React, { useContext, useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'
// import { useEffect } from 'react'


import { UserDataContext } from '../Context/UserDatacontext'

const UserProtectiveWarapper = ({children}) => {
    const {setUser} = useContext(UserDataContext)
    const [isLoading, setIsLoading] = useState(true);
    const token = localStorage.getItem("token")
    const navigate = useNavigate();
    useEffect(() => {
            if(!token){
                navigate("/login");
                return;
            }
            console.log(token);
            const fetchProfile = async () => {
                try {
                    const response = await axios.get(`${import.meta.env.VITE_BASE_URL}/users/profile`,{
                        headers:{
                            Authorization: `Bearer ${token}`
                        }
                    })
                    if(response.status === 200){
                        const data = response.data
                        setUser(data)
                        setIsLoading(false)
                    }
                } catch (error) {
                    console.log(error);
                    navigate("/login")
                }
            };
            fetchProfile();
        }
        , [token,navigate,setUser])
    // useEffect(() => {
    //     if(!token){
    //         navigate("/login")
    //     }
    //     console.log(token);
    //     axios.get(`${import.meta.env.VITE_BASE_URL}/users/profile`,{
    //         headers:{
    //             Authorization: `Bearer ${token}`
    //         }
    //     }).then((response) => {
    //         if(response.status === 200){
    //             const data = response.data
    //             setUser(data)
    //             setIsLoading(false)
    //         }
    //     }).catch((error) => {
    //         console.log(error);
    //         navigate("/login")
    //     })
    // }, [token, navigate, setUser])
    if(isLoading){
        return (
            <div>
                Loading...
            </div>
        )
    }
   
    // if(!token){
    //     navigate("/login")
    // }
  return (
    <>
      {children}
    </>
  )
}

export default UserProtectiveWarapper
