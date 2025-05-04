import React from "react";
import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";

const RidePopUp = ({
  rideOpenPanel,
  setRideOpenPanel,
  setisConfirmRidePopUp,
  ride,
  ConfirmRide,
}) => {
 
  const ridePanelRef = useRef(null);
  useGSAP(() => {
    // animate vertical slide
    gsap.to(ridePanelRef.current, {
      y: rideOpenPanel ? 0 : "100%",
      duration: 0.4,
      ease: "power3.out",
    });
  }, [rideOpenPanel]);
  return (
    <div
      ref={ridePanelRef}
      //   className="fixed  z-20 bottom-0    bg-white transform translate-y-full"
      className="fixed w-full z-10 bottom-0 px-4 py-5 pt-14 bg-white transform translate-y-full"
    >
      <h3 className="text-2xl font-medium">New Ride Available!</h3>

      <div className="flex items-center justify-between p-3 bg-yellow-400 rounded-lg mt-6">
        <div className="flex items-center gap-3">
          <img
            className=" h-12 w-12 rounded-full object-cover"
            src="https://cdn.quotesgram.com/img/85/87/1731438144-BcogIEmIEAA3O5m.jpg"
            alt=""
          />
          <h2 className="text-lg font-medium -mt-1 text-gray-800 capitalize" >{ride?.user.fullname.firstname + " " + ride?.user.fullname.lastname}</h2>
        </div>
        <h5>2.2 KM</h5>
      </div>

      <div className="w-full  mt-3">
        <div className="flex  items-center p-3 border-b-2 border-gray-400  gap-5">
          <i class="ri-map-pin-line"></i>
          <div>
            <h3 className="text-base font-medium">PickUp Location</h3>
            <p className="text-lg font-medium -mt-1 text-gray-800">
             {ride?.pickup}
            </p>
          </div>
        </div>
        <div className="flex  items-center p-3 border-b-2 border-gray-400  gap-5">
          <i className=" text-lg ri-map-pin-2-fill"></i>
          <div>
            <h3 className="text-base font-medium">Destination</h3>
            <p className="text-lg font-medium -mt-1 text-gray-800">
             { ride?.destination}
            </p>
          </div>
        </div>
        <div className="flex  items-center p-3  gap-5">
          <i class=" text-lg ri-money-rupee-circle-line"></i>
          <div>
            <h3 className="text-base font-semibold ">Payment</h3>
            <p className="text-lg font-medium -mt-1 text-gray-800">{ride?.fare}</p>
          </div>
        </div>
      </div>
      <div className="flex justify-between mt-5 items-center">
        <button
          onClick={() => {
            setRideOpenPanel(false);
          }}
          className="   bg-red-500 text-white font-semibold p-3 px-8  rounded-lg"
        >
          Reject
        </button>

        <button
          onClick={() => {
            setisConfirmRidePopUp(true);
            ConfirmRide({ skipClose: true })
            setisConfirmRidePopUp(true);
            
          }}
          className="   bg-green-700 text-white font-semibold p-3 px-8 rounded-lg"
        >
          Accept
        </button>
      </div>
    </div>
  );
};

export default RidePopUp;
