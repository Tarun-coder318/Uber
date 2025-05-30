import React from "react";
import { Link ,useLocation} from "react-router-dom";
import { useContext } from "react";

import { SocketDataContext } from "../Context/SocketDataContext";

import {useNavigate} from "react-router-dom";
import LiveTracking from "../Components/LiveTracking";

const Riding = () => {
  const location = useLocation();
  const{ ride } = location.state || {}; // Destructure ride from location.state
  const { socket } = useContext(SocketDataContext);
  const navigate = useNavigate();


  socket.on("ride-completed", (data) => {
    console.log("Ride completed:", data);
    navigate("/home");
  });
  
 
  return (
    <div className="h-screen ">
        <Link to="/home" className="fixed top-2 right-2 h-10 w-10 bg-white flex items-center justify-center rounded-full">
        <i class=" text-lg  ri-home-5-line"></i>
        </Link>
      <div className="h-1/2">
       <LiveTracking/>
      </div>
      <div className="h-1/2 p-4">
        <div className="flex items-center  justify-between">
          <img
            className="h-15"
            src="https://cdn-icons-png.flaticon.com/512/89/89131.png"
            alt=""
          />
          <div className="text-right">
            <h2 className="text-lg font-medium capitalize">{ride.captain.fullname.firstname + " " +ride.captain.fullname.lastname}</h2>
            <h4 className="text-lg font-semibold -mt-1 -mb-1 capitalize">{ride.captain?.vehicle?.plateNumber }</h4>
            <p className="text-sm text-gray-600">Maruti Suziki Alto</p>
          </div>
        </div>

        <div className="flex gap-2 justify-between items-center flex-col">
          <div className="w-full  mt-3">
           
            <div className="flex  items-center p-3 border-b-2 border-gray-400  gap-5">
              <i className=" text-lg ri-map-pin-2-fill"></i>
              <div>
                <h3 className="text-lg font-medium">Pickup Location</h3>
                <p className="text-base -mt-1 text-gray-800">
                 {ride.pickup}
                </p>
              </div>
            </div>
            <div className="flex  items-center p-3  gap-5">
              <i class=" text-lg ri-money-rupee-circle-line"></i>
              <div>
                <h3 className="text-lg ">Payment</h3>
                <p className="text-base -mt-1 text-gray-800">{ride.fare}</p>
              </div>
            </div>
          </div>
        </div>

        <button className=" w-full mt-3 bg-green-700 text-white font-semibold p-2 rounded-lg">Make a Payment</button>
      </div>
    </div>
  );
};

export default Riding;
