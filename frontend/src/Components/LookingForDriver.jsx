import React from "react";
import { useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";

const LookingForDriver = (props) => {
  console.log("setLookingForDriverOpen:", props.setLookingForDriverOpen); 
  console.log("lookingForDriverOpen:", props.lookingForDriverOpen);

  const lookingForDriverRef = useRef(null);

  useGSAP(() => {
    if (props.lookingForDriverOpen) {
      gsap.to(lookingForDriverRef.current, {
        transform: "translateY(0)",
      });
    } else {
      gsap.to(lookingForDriverRef.current, {
        transform: "translateY(100%)",
      });
    }
  }, [props.lookingForDriverOpen]);

  return (
    <div
      ref={lookingForDriverRef}
      className="fixed w-full  bottom-0 px-2 py-2 pt-10 bg-white transform translate-y-full"
    >
      <h4
        className="text-center p-1 w-[90%] absolute top-0 font-semibold"
        onClick={() => props.setLookingForDriverOpen(false)}
      >
        <i className="text-gray-400 text-3xl ri-arrow-down-wide-line"></i>
      </h4>
      <h3 className="text-2xl font-medium">Looking For Driver</h3>
      <div className="flex gap-2 justify-between items-center flex-col">
        <img
          className="h-25"
          src="https://www.pngplay.com/wp-content/uploads/8/Uber-PNG-Photos.png"
          alt=""
        />
        <div className="w-full  mt-3">
          <div className="flex  items-center p-3 border-b-2 border-gray-400  gap-5">
            <i class="ri-map-pin-line"></i>
            <div>
              <h3 className="text-lg font-medium">562/11-A</h3>
              <p className="text-base -mt-1 text-gray-800">
                {props.pickupLocation}
              </p>
            </div>
          </div>
          <div className="flex  items-center p-3 border-b-2 border-gray-400  gap-5">
            <i className=" text-lg ri-map-pin-2-fill"></i>
            <div>
              <h3 className="text-lg font-medium">Third Wave Coffee</h3>
              <p className="text-base -mt-1 text-gray-800">
                {props.dropLocation}
              </p>
            </div>
          </div>
          <div className="flex  items-center p-3  gap-5">
            <i class=" text-lg ri-money-rupee-circle-line"></i>
            <div>
              <h3 className="text-lg ">{props.fare[props.vehicleType]}</h3>
              <p className="text-base -mt-1 text-gray-800">Cash Cash</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LookingForDriver;
