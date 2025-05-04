import React, { useRef } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
// import { Link } from "react-router-dom";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const FinishRide = (props) => {
  const finishRideRef = useRef(null);
  const navigate = useNavigate();

  useGSAP(() => {
    if (props.finishRideOpen) {
      gsap.to(finishRideRef.current, {
        transform: "translateY(0)",
      });
    } else {
      gsap.to(finishRideRef.current, {
        transform: "translateY(100%)",
      });
    }
  }, [props.finishRideOpen]);

  async function endRide() {
    const response = await axios.post(
      `${import.meta.env.VITE_BASE_URL}/rides/end-ride`,
      {
        rideId: props.ride._id,
      },
      {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      }
    );
    if (response.status === 200) {
      console.log("Ride ended successfully", response.data);
      
      // props.setFinishRideOpen(false);
      // props.setRideOpenPanel(false);
      navigate("/captain/home");
    }
  }

      

        

  return (
    <div
      ref={finishRideRef}
      className="fixed w-full  h-4/5 z-10 bottom-0 px-4 py-5 pt-14 bg-white transform translate-y-full"
    >
      <h3 className="text-2xl font-medium"> Ride Finished</h3>

      <div className="flex items-center justify-between p-3 border-2 border-yellow-400 rounded-lg mt-6">
        <div className="flex items-center gap-3">
          <img
            className=" h-12 w-12 rounded-full object-cover"
            src="https://cdn.quotesgram.com/img/85/87/1731438144-BcogIEmIEAA3O5m.jpg"
            alt=""
          />
          <h2>{props.ride.user.fullname.firstname + " " +props.ride.user.fullname.lastname }</h2>
        </div>
        <h5 className="font-semibold text-lg">2.2 KM</h5>
      </div>

      <div className="w-full  mt-3">
        <div className="flex  items-center p-3 border-b-2 border-gray-400  gap-5">
          <i class="ri-map-pin-line"></i>
          <div>
            <h3 className="text-lg font-medium">PickUp </h3>
            <p className="text-base -mt-1 text-gray-800">
             {props.ride.pickup}
            </p>
          </div>
        </div>
        <div className="flex  items-center p-3 border-b-2 border-gray-400  gap-5">
          <i className=" text-lg ri-map-pin-2-fill"></i>
          <div>
            <h3 className="text-lg font-medium">Destination</h3>
            <p className="text-base -mt-1 text-gray-800">
              {props.ride.destination}
            </p>
          </div>
        </div>
        <div className="flex  items-center p-3  gap-5">
          <i class=" text-lg ri-money-rupee-circle-line"></i>
          <div>
            <h3 className="text-lg font-semibold ">Payment</h3>
            <p className="text-base -mt-1 text-gray-800">{props.ride.fare}</p>
          </div>
        </div>
      </div>
      <div className="mt-6 w-full">
        <button
          onClick={endRide}
          className=" w-full mt-3 flex justify-center bg-green-700 text-white font-semibold p-3 rounded-lg"
        >
          Finished Ride
        </button>
      </div>
    </div>
  );
};

export default FinishRide;
