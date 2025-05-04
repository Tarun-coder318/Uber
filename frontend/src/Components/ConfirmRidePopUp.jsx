import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import React, { useRef, useState } from "react";
// import { Link } from "react-router-dom";
import  axios from "axios";
import { useNavigate } from "react-router-dom";

const ConfirmRidePopUp = (props) => {
  const confirmRidePopUpRef = useRef(null);
  const [otp, setOtp] = useState("");
  const navigate = useNavigate();

  useGSAP(() => {
    gsap.to(confirmRidePopUpRef.current, {
      y: props.isConfirmRidePopUp ? 0 : "100%",
      duration: 0.4,
      ease: "power3.out",
    });
  }, [props.isConfirmRidePopUp]);

  const submitHandler = async(e) => {
    e.preventDefault();
    const response = await axios.get(`${import.meta.env.VITE_BASE_URL}/rides/start-ride`, {
      params: {
        rideId: props.ride._id,
        otp: otp,
      },
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    });
    if (response.status === 200) {
      console.log("Ride started successfully", response.data);
      props.setisConfirmRidePopUp(false);
      props.setRideOpenPanel(false);
      navigate("/captain/riding", { state: { ride: props.ride} });
    }
    
   
     
   
  };



  return (
    <div
      ref={confirmRidePopUpRef}
      className="fixed w-full  h-screen z-10 bottom-0 px-4 py-5 pt-14 bg-white transform translate-y-full"
    >
      <h3 className="text-2xl font-medium">Confirm This Ride to Start</h3>

      <div className="flex items-center justify-between p-3 bg-yellow-400 rounded-lg mt-6">
        <div className="flex items-center gap-3">
          <img
            className=" h-12 w-12 rounded-full object-cover"
            src="https://cdn.quotesgram.com/img/85/87/1731438144-BcogIEmIEAA3O5m.jpg"
            alt=""
          />
          <h2>{props.ride?.user.fullname.firstname + ' ' + props.ride?.user.fullname.lastname}</h2>
        </div>
        <h5>2.2 KM</h5>
      </div>

      <div className="w-full  mt-3">
        <div className="flex  items-center p-3 border-b-2 border-gray-400  gap-5">
          <i class="ri-map-pin-line"></i>
          <div>
            <h3 className="text-lg font-medium">PickUP Location</h3>
            <p className="text-base -mt-1 text-gray-800">
              {props.ride?.pickup}
            </p>
          </div>
        </div>
        <div className="flex  items-center p-3 border-b-2 border-gray-400  gap-5">
          <i className=" text-lg ri-map-pin-2-fill"></i>
          <div>
            <h3 className="text-lg font-medium">Destinaton</h3>
            <p className="text-base -mt-1 text-gray-800">
              {props.ride?.destination}
            </p>
          </div>
        </div>
        <div className="flex  items-center p-3  gap-5">
          <i class=" text-lg ri-money-rupee-circle-line"></i>
          <div>
            <h3 className="text-lg ">Payment</h3>
            <p className="text-base -mt-1 text-gray-800">{props.ride?.fare}</p>
          </div>
        </div>
      </div>
      <div className="mt-6 w-full">
        <form
          onSubmit={submitHandler}
        >
          <input
            value={otp}
            onChange={(e) => {
              setOtp(e.target.value);
            }}
            type="text"
            placeholder="Enter OTP"
            className="bg-[#eeeeee] mb-7 rounded px-6 py-3 font-mono w-full text-lg "
          />
          <button
           
            className=" w-full mt-3 flex justify-center bg-green-700 text-white font-semibold p-3 rounded-lg"
          >
            Confirm
          </button>
          <button
            onClick={() => {
              props.setRideOpenPanel(false);
              props.setisConfirmRidePopUp(true);
            }}
            className=" w-full mt-3 bg-red-500 text-white font-semibold p-3 *:**:rounded-lg"
          >
            Cancel
          </button>
        </form>
      </div>
    </div>
  );
};

export default ConfirmRidePopUp;
