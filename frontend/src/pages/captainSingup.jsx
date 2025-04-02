import React, { useState } from 'react';
import { Link , useNavigate} from 'react-router-dom';
import axios from 'axios';
import { CaptainDataContext } from '../Context/CaptainDataContext';
import { useContext } from 'react';
// import { setDriver } from 'mongoose';

const CaptainSignup = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [Firstname, setFirstname] = useState("");
  const [Lastname, setLastname] = useState("");
  const [vehicleColor, setVehicleColor] = useState("");
  const [vehiclePlateNumber, setVehiclePlateNumber] = useState("");
  //  const [userData, setUserData] = useState([]);

  const { setCaptain } = useContext(CaptainDataContext);
const navigate = useNavigate();
  const submitHandler = async (e) => {
    e.preventDefault();
    console.log("VITE_BASE_URL:", import.meta.env.VITE_BASE_URL);
    console.log("Submit button clicked!");
  
    // setUserData((prevUserData) => [...prevUserData, {fullname:{Firstname,Lastname}, email, password }]);
  const NewCaptain={
    fullname:{
      firstname: Firstname,
      lastname: Lastname,
    },
    email,
    password,
    vehicle:{
      color: vehicleColor,
      plateNumber: vehiclePlateNumber
    }
  }
  console.log("NewCaptain Data:", NewCaptain);
  
  try {
    const apiUrl = `${import.meta.env.VITE_BASE_URL}/captains/register`;
    console.log("Sending request to:", apiUrl);

    const response = await axios.post(apiUrl, NewCaptain);

    console.log("Response received:", response);

    if (response.status === 201) {
      const data = response.data;
      setCaptain(data);
      alert("Signup successful! Redirecting...");
      localStorage.setItem("token", data.token);
      navigate("/captain/home");

      // Clear form fields
      setFirstname("");
      setLastname("");
      setEmail("");
      setPassword("");
      setVehicleColor("");
      setVehiclePlateNumber("");
    }
  } catch (error) {
    console.error("Error during signup:", error);

    if (error.response) {
      console.error("Server responded with:", error.response.data);
    } else if (error.request) {
      console.error("No response received. Possible network issue.");
    } else {
      console.error("Axios request error:", error.message);
    }
  }
};
  // const response = await axios.post(`${import.meta.env.VITE_BASE_URL}/captains/register`, NewCaptain);
  // if(response.status === 201){
  //     const data = response.data
  //     setCaptain(data)
  //     alert("Signup successful! Redirecting...");
  //     localStorage.setItem("token",data.token)
  //     navigate("/Home");
  // }

  //   // console.log({userData});
  //   setFirstname("");
  //   setLastname("");
  //   setEmail("");
  //   setPassword("");
  //   setVehicleColor("");
  //   setVehiclePlateNumber("");
  // };

  // useEffect(() => {
  //   console.log("Updated userData:", userData);
  // }, [userData]);

  return (
    <div className="p-7  h-screen flex flex-col justify-between">
      <div>
        <img
          className="w-30 ml-10"
          src="https://th.bing.com/th/id/R.eadac11b662faa57e4b806263f8e7642?rik=dXbhLg7x49QVbg&riu=http%3a%2f%2fpluspng.com%2fimg-png%2fuber-logo-vector-png-uber-icon-png-50-px-1600.png&ehk=hWY6TYYwZAYpPbHKLid%2f431JJx%2frKI7tiY%2b6i993Y1A%3d&risl=&pid=ImgRaw&r=0"
          alt=""
        />
        <form onSubmit={(e) => submitHandler(e)}>
          <h3 className="text-base font-medium mb-2">What's your Name</h3>
          <div className="flex gap-4 mb-5">
            <input
              required
              value={Firstname}
              onChange={(e) => setFirstname(e.target.value)}
              className="bg-[#eeeeee]  rounded px-4 py-2  w-1/2 text-base"
              type="text"
              placeholder="First Name"
            />
            <input
              required
              value={Lastname}
              onChange={(e) => setLastname(e.target.value)}
              className="bg-[#eeeeee]  rounded px-4 py-2  w-1/2 text-base"
              type="text"
              placeholder="Last Name"
            />
          </div>
          <h3 className="text-base font-medium mb-2">What's your email</h3>
          <input
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="bg-[#eeeeee] mb-5 rounded px-4 py-2  w-full text-base"
            type="email"
            placeholder="email@example.com"
          />
          <h3 className="text-base mb-2 font-medium">Enter password</h3>
          <input
            className="bg-[#eeeeee] mb-5 rounded px-4 py-2  w-full text-base placeholder:text-sm"
            required
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            type="password"
            placeholder="password"
          />
           <h3 className="text-base font-medium mb-2">Vehcile</h3>
          <div className="flex gap-4 mb-5">
            <input
              required
              value={vehicleColor}
              onChange={(e) => setVehicleColor(e.target.value)}
              className="bg-[#eeeeee]  rounded px-4 py-2  w-1/2 text-base"
              type="text"
              placeholder="Vehicle Color"
            />
            <input
              required
              value={vehiclePlateNumber}
              onChange={(e) => setVehiclePlateNumber(e.target.value)}
              className="bg-[#eeeeee]  rounded px-4 py-2  w-1/2 text-base"
              type="text"
              placeholder="Vehicle Plate Number"
            />
          </div>
           
          
          <button className="bg-[#111] text-white font-semibold mb-3 rounded px-4 py-2  w-full text-base placeholder:text-sm">
            Create Account As Captain
          </button>
        </form>
        <p className="text-center">
          Already have an Account?
          <Link to="/captain-login" className="text-blue-600">
            Login here
          </Link>
        </p>
      </div>
      <div>
        <p className="text-[12px] leading-tight">
          By proceeding you consent to get calls, whatsapp or SMS messages,
          including by automated means, from uber and its affilates to the
          number provided.
        </p>
      </div>
    </div>
  );
};

export default CaptainSignup
