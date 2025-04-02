import React,{useState}   from 'react'
import { CaptainDataContext } from './CaptainDataContext';

const CaptainContext = ({children}) => {
    const [captain, setCaptain] = useState({
        email: "",
        password: "",
        fullname: {
            firstname: "",
            lastname: "",
        },
    });
    return (
        <CaptainDataContext.Provider value={{captain, setCaptain}}>
            {children}
        </CaptainDataContext.Provider>
    )

}

export default CaptainContext
