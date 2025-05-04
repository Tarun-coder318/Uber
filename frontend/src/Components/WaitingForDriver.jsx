import React, { useRef } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";

const WaitingForDriver = (props) => {
  const WaitingForDriverRef = useRef(null);

  useGSAP(() => {
    if (props.WaitingForDriverOpen) {
      gsap.to(WaitingForDriverRef.current, {
        transform: "translateY(0)",
      });
    } else {
      gsap.to(WaitingForDriverRef.current, {
        transform: "translateY(100%)",
      });
    }
  }, [props.WaitingForDriverOpen]);

  return (
    <div
      ref={WaitingForDriverRef}
      className="fixed w-full  bottom-0 px-2 transform translate-y-full py-2 pt-10 bg-white "
    >
      <h4
        className="text-center p-1 w-[90%] absolute top-0 font-semibold"
        onClick={() => props.setWaitingForDriverOpen(false)}
      >
        <i className="text-gray-400 text-3xl ri-arrow-down-wide-line"></i>
      </h4>
      <div className="flex items-center  justify-between">
        <img
          className="h-15"
          src="https://www.pngplay.com/wp-content/uploads/8/Uber-PNG-Photos.png"
          alt=""
        />
        <div className="text-right">
          <h2 className="text-lg font-medium capitalize">{props.ride?.captain?.fullname?.firstname + " " + props.ride?.captain?.fullname?.lastname}</h2>
          <h4 className="text-lg font-semibold -mt-1 -mb-1 capitalize">{props.ride?.captain?.vehicle?.plateNumber }</h4>
          <p className="text-sm text-gray-600">Maruti Suziki Alto</p>
          <h3 className="text-base font-medium  text-gray-800">{props.ride.otp}</h3>
        </div>
      </div>

      <div className="flex gap-2 justify-between items-center flex-col">
        <div className="w-full  mt-3">
          <div className="flex  items-center p-3 border-b-2 border-gray-400  gap-5">
            <i class="ri-map-pin-line"></i>
            <div>
              <h3 className="text-base font-medium  text-gray-800">PickUp Location</h3>
              <p className="text-lg font-medium -mt-1 ">
               {props.ride?.pickup}
              </p>
            </div>
          </div>
          <div className="flex  items-center p-3 border-b-2 border-gray-400  gap-5">
            <i className=" text-lg ri-map-pin-2-fill"></i>
            <div>
              <h3 className="text-base font-medium  text-gray-800">Destination</h3>
              <p className="text-lg font-medium -mt-1">
                {props.ride?.destination}
              </p>
            </div>
          </div>
          <div className="flex  items-center p-3  gap-5">
            <i class=" text-lg ri-money-rupee-circle-line"></i>
            <div>
              <h3 className="text-base font-medium  text-gray-800">Payment</h3>
              <p className="text-lg font font-medium -mt-1">{props.ride?.fare}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default WaitingForDriver;
