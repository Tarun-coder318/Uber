import React, { useContext, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { CaptainDataContext } from '../Context/CaptainDataContext'
import { useEffect } from 'react'
import axios from 'axios'
const CaptainProtectWrapper = ({children}) => {
    const token =localStorage.getItem("token")
    const navigate = useNavigate();
    const { setCaptain} = useContext(CaptainDataContext);
    const [isLoading, setIsLoading] = useState(true);
    useEffect(() => {
        if(!token){
            navigate("/captain-login");
            return;
        }
        console.log(token);
        const fetchProfile = async () => {
            try {
                const response = await axios.get(`${import.meta.env.VITE_BASE_URL}/captains/profile`,{
                    headers:{
                        Authorization: `Bearer ${token}`
                    }
                })
                if(response.status === 200){
                    const data = response.data
                    setCaptain(data)
                    setIsLoading(false)
                }
            } catch (error) {
                console.log(error);
                navigate("/captain-login")
            }
        };
        fetchProfile();
    }
    , [token,navigate,setCaptain])
    // axios.get(`${import.meta.env.VITE_BASE_URL}/captains/profile`,{
    //     headers:{
    //         Authorization: `Bearer ${token}`
    //     }
    // }).then((response) => {
    //     if(response.status === 200){
    //         const data = response.data
    //         setCaptain(data)
    //         setIsLoading(false)
    //     }
    // }).catch((error) => {
    //     console.log(error);
    //     navigate("/captain-login")
    // })
    
    if(isLoading){
        return (
            <div>
                Loading...
            </div>
        )
    }
    
    return (
      <>
        {children}
      </>
    )
}

export default CaptainProtectWrapper
