import React, { useState } from "react";
import { Link } from "react-router-dom";
import CaptainsDetails from "../Components/CaptainsDetails";
import RidePopUp from "../Components/RidePopUp.JSX";
import ConfirmRidePopUp from "../Components/ConfirmRidePopUp";
import { useContext, useEffect } from "react";
import { CaptainDataContext } from "../Context/CaptainDataContext";
import { SocketDataContext } from "../Context/SocketDataContext";

const CaptainHome = () => {
  const [rideOpenPanel, setRideOpenPanel] = useState(true);
  const [isConfirmRidePopUp, setisConfirmRidePopUp] = useState(false);

  const { socket } = useContext(SocketDataContext);
  const { captain } = useContext(CaptainDataContext);

  // useEffect(() => {
  //   socket.emit("join",{userId:captain._id, userType:"captain"})
  // })
  //   useEffect(() => {
  //     if (captain?._id) {
  //       socket.emit("join", { userId: captain._id, userType: "captain" });
  //     }
  //   }, [captain, socket]);

  //   const updateLocation = () =>{
  //     if(navigator.geolocation){
  //       navigator.geolocation.getCurrentPosition((position) =>
  //         socket.emit("update-location-captains", {
  //           userId: captain._id,
  //           location: {
  //             ltd: position.coords.latitude,
  //             lng: position.coords.longitude,
  //           },
  //         })
  //       );
  //     }

  //   }
  //  const locationInterval = setInterval(updateLocation,10000)
  //  return ()=>clearInterval(locationInterval);
  // });
  useEffect(() => {
    // Check if captain is defined and has _id
    if (captain?._id && socket) {
      // Emit the "join" event to the server
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
    }
  }, [captain, socket]);

  socket.on("new-ride", (data) => {
    console.log("New ride request received:", data);
  });

  return (
    <div className="h-screen ">
      <div className="fixed top-0 right-1  flex items-center justify-between ">
        <img
          className="w-16"
          src="https://logospng.org/download/uber/logo-uber-4096.png"
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
          setRideOpenPanel={setRideOpenPanel}
          rideOpenPanel={rideOpenPanel}
          setisConfirmRidePopUp={setisConfirmRidePopUp}
        />
      </div>
      <div>
        <ConfirmRidePopUp
          isConfirmRidePopUp={isConfirmRidePopUp}
          setisConfirmRidePopUp={setisConfirmRidePopUp}
          setRideOpenPanel={setRideOpenPanel}
        />
      </div>
    </div>
  );
};

export default CaptainHome;
