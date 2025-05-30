import React, { useState,useContext } from "react";
import { Link,useNavigate } from "react-router-dom";
import axios from "axios";
import { UserDataContext } from "../Context/UserDatacontext";
const UserLogin = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  // const [userData, setUserData] = useState([]);

  const { setUser } = useContext(UserDataContext);
  const navigate = useNavigate();
  const submitHandler =async (e) => {
    e.preventDefault();
    // setUserData([...userData, { email, password }]);
    // setUserData({ email, password });
    // setUserData({ email:email,
    //   password:password
    //  })
    // setUserData((prevUserData) => [...prevUserData, { email, password }]);

    // console.log(userData);
    const user = {
      email,
      password,
    }
     const response = await axios.post(`${import.meta.env.VITE_BASE_URL}/users/login`, user);
     if(response.status === 200){
         const data = response.data
         setUser(data)
         alert("Login successful! Redirecting...");
         localStorage.setItem("token",data.token)
         navigate("/Home");
     }

    setEmail("");
    setPassword("");
  }
  return (

    <div className="p-7  h-screen flex flex-col justify-between">
      <div>
        <img
          className="w-30 ml-10"
          src="https://cdn-icons-png.flaticon.com/512/89/89131.png"
          alt=""
        />
        <form onSubmit={(e) => submitHandler(e)} >
          <h3 className="text-lg font-medium mb-2">What's your email</h3>
          <input
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="bg-[#eeeeee] mb-7 rounded px-4 py-2  w-full text-lg"
            type="email"
            placeholder="email@example.com"
          />
          <h3 className="text-lg mb-2 font-medium">Enter password</h3>
          <input
            className="bg-[#eeeeee] mb-7 rounded px-4 py-2  w-full text-lg placeholder:text-base"
            required
            value={password}
            onChange={(e)=>setPassword(e.target.value)}
            type="password"
            placeholder="password"
          />
          <button className="bg-[#111] text-white font-semibold mb-3 rounded px-4 py-2  w-full text-lg placeholder:text-base">
            Login
          </button>
        
        </form>
        <p className="text-center">New here?<Link to='/singup' className='text-blue-600'>Create new Account</Link></p>
      </div>
      <div>
        <Link  to='/captain-login'className="bg-[#10b461] flex items-center justify-center text-white font-semibold mb-7 rounded px-4 py-2  w-full text-lg placeholder:text-base">
          Sign in as Captain
        </Link>
      </div>
    </div>
  );
};

export default UserLogin;
