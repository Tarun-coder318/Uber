import React from "react";
import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";

const RidePopUp = ({
  rideOpenPanel,
  setRideOpenPanel,
  setisConfirmRidePopUp,
}) => {
  //   const Ridepanel = useRef(null);

  //   useGSAP(() => {
  //     if (props.RideOpenPanel) {
  //       gsap.to(Ridepanel.current, {
  //         transform: "translateY(0)",
  //       });
  //     } else {
  //       gsap.to(Ridepanel.current, {
  //         transform: "translateY(100%)",
  //       });
  //     }
  //   }, [props.rideOpenPanel]);
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
          <h2>Harsh Patel</h2>
        </div>
        <h5>2.2 KM</h5>
      </div>

      <div className="w-full  mt-3">
        <div className="flex  items-center p-3 border-b-2 border-gray-400  gap-5">
          <i class="ri-map-pin-line"></i>
          <div>
            <h3 className="text-lg font-medium">562/11-A</h3>
            <p className="text-base -mt-1 text-gray-800">
              Haldaur chowk,Bijnor
            </p>
          </div>
        </div>
        <div className="flex  items-center p-3 border-b-2 border-gray-400  gap-5">
          <i className=" text-lg ri-map-pin-2-fill"></i>
          <div>
            <h3 className="text-lg font-medium">Third Wave Coffee</h3>
            <p className="text-base -mt-1 text-gray-800">
              17th Cross Rd, 5th Block, Koramangala , Bengaluru, Karnataka
              560034
            </p>
          </div>
        </div>
        <div className="flex  items-center p-3  gap-5">
          <i class=" text-lg ri-money-rupee-circle-line"></i>
          <div>
            <h3 className="text-lg font-semibold ">190.30</h3>
            <p className="text-base -mt-1 text-gray-800">Cash Cash</p>
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
