import React, { useState, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { UserDataContext } from "../Context/UserDatacontext";
const Usersingup = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [Firstname, setFirstname] = useState("");
  const [Lastname, setLastname] = useState("");

  const navigate = useNavigate();
  const { setUser } = useContext(UserDataContext);

  const submitHandler = async (e) => {
    e.preventDefault();

    const NewUser = {
      fullname: {
        firstname: Firstname, // ✅ Lowercase key
        lastname: Lastname, // ✅ Lowercase key
      },
      email,
      password,
    };

    const response = await axios.post(
      `${import.meta.env.VITE_BASE_URL}/users/register`,
      NewUser
    );
    if (response.status === 201) {
      const data = response.data;
      setUser(data);
      alert("Signup successful! Redirecting...");
      localStorage.setItem("token", data.token);
      navigate("/Home");

      // Clear form fields
      setFirstname("");
      setLastname("");
      setEmail("");
      setPassword("");
    }
  };

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
          <button className="bg-[#111] text-white font-semibold mb-3 rounded px-4 py-2  w-full text-base placeholder:text-sm">
            Create Account
          </button>
        </form>
        <p className="text-center">
          Already have an Account?
          <Link to="/login" className="text-blue-600">
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

export default Usersingup;
