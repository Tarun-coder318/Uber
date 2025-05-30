import React, { useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import CaptainsDetails from "../Components/CaptainsDetails";
import RidePopUp from "../Components/RidePopUp.JSX";
import ConfirmRidePopUp from "../Components/ConfirmRidePopUp";
import { useContext, useEffect } from "react";
import { CaptainDataContext } from "../Context/CaptainDataContext";
import { SocketDataContext } from "../Context/SocketDataContext";

const CaptainHome = () => {
  const [rideOpenPanel, setRideOpenPanel] = useState(false);
  const [isConfirmRidePopUp, setisConfirmRidePopUp] = useState(false);
  const [ride, setRide] = useState(null);

  const { socket } = useContext(SocketDataContext);
  const { captain } = useContext(CaptainDataContext);

  
  useEffect(() => {
   
      socket.emit("join", { userId: captain._id, userType: "captain" });

      // Update captain's location periodically
      const updateLocation = () => {
        if (navigator.geolocation) {
          navigator.geolocation.getCurrentPosition((position) => {
            console.log({
              userId: captain._id,
              location: {
                lng: position.coords.longitude,
                lat: position.coords.latitude,
              },
            });

            socket.emit("update-location-captains", {
              userId: captain._id,
              location: {
                lng: position.coords.longitude,
                lat: position.coords.latitude,
              },
            });
          });
        }
      };

      const locationInterval = setInterval(updateLocation, 10000);
      updateLocation();

      return () => {
        clearInterval(locationInterval);
      };
  }, [socket, captain._id]);

  socket.on("new-ride", (data) => {
    console.log("New ride request received:", data);
    setRide(data);
    setRideOpenPanel(true);
  });

  
  async function ConfirmRide({ skipClose = false } = {}) {
    try {
      const response = await axios.post(`${import.meta.env.VITE_BASE_URL}/rides/confirm`, {
        rideId: ride._id,
      }, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
  
      console.log("Ride confirmed:", response.data);
  
      // Only close popups if skipClose is false
      if (!skipClose) {
        setisConfirmRidePopUp(false);
        setRideOpenPanel(false);
      }
    } catch (error) {
      console.error("Error confirming ride:", error);
    }
  }
  

  return (
    <div className="h-screen ">
      <div className="fixed top-0 right-1  flex items-center justify-between ">
        <img
          className="w-16"
          src="https://cdn-icons-png.flaticon.com/512/89/89131.png"
          alt=""
        />
        <Link
          to="/home"
          className=" h-10 w-10 bg-white flex items-center justify-center rounded-full"
        >
          <i class="ri-logout-box-r-line"></i>
        </Link>
      </div>
      <div className="h-3/5">
        <img
          className="h-full w-full object-cover "
          src="https://www.hanbit.co.kr/data/editor/20210429161116_qvzgnfvw.gif"
          alt=""
        />
      </div>

      <div className="h-2/5 ">
        <CaptainsDetails setRideOpenPanel={setRideOpenPanel} />
      </div>
      <div>
        <RidePopUp
        ride={ride}
          setRideOpenPanel={setRideOpenPanel}
          rideOpenPanel={rideOpenPanel}
          setisConfirmRidePopUp={setisConfirmRidePopUp}
          ConfirmRide={ConfirmRide}
        />
      </div>
      <div>
        <ConfirmRidePopUp
          isConfirmRidePopUp={isConfirmRidePopUp}
          setisConfirmRidePopUp={setisConfirmRidePopUp}
          setRideOpenPanel={setRideOpenPanel}
          ride={ride}
        />
      </div>
    </div>
  );
};

export default CaptainHome;
