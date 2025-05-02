import React, { useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";

const VehiclePanel = (props) => {
  const vehiclePanelRef = useRef(null);

  //   useEffect(() => {
  //     gsap.to(vehiclePanelRef.current, {
  //       transform: vehiclePanelOpen ? "translateY(0%)" : "translateY(100vh)", // ✅ Fixed transform issue
  //       duration: 0.5, // ✅ Smooth animation
  //     });
  //   }, [vehiclePanelOpen]);
  useGSAP(() => {
    if (props.vehiclePanelOpen) {
      gsap.to(vehiclePanelRef.current, {
        transform: "translateY(0)",
      });
    } else {
      gsap.to(vehiclePanelRef.current, {
        transform: "translateY(100%)",
      });
    }
  }, [props.vehiclePanelOpen]);

  return (
    <div
      ref={vehiclePanelRef}
      className="fixed w-full z-10 bottom-0 px-4 py-5 pt-14 bg-white transform translate-y-full"
    >
      <h4
        className="text-center p-1 w-[90%] absolute top-0 font-semibold"
        onClick={() => props.setVehiclePanelOpen(false)}
      >
        <i className="text-gray-400 text-3xl ri-arrow-down-wide-line"></i>
      </h4>

      <div
        onClick={() => {
          props.setConfirmRideOpen(true);
          props.setVehiclePanelOpen(false);
          props.selectVehicle("car");
        }}
        className="flex border-2 border-gray-300 active:border-black w-full mb-2 rounded-xl p-3 items-center justify-between"
      >
        <img
          className="h-15"
          src="https://www.pngplay.com/wp-content/uploads/8/Uber-PNG-Photos.png"
          alt=""
        />
        <div className="ml-3 w-1/2">
          <h4 className="font-bold text-base">
            UberGo{" "}
            <span>
              <i className="ri-user-3-fill"></i>4
            </span>
          </h4>
          <h5 className="font-medium text-sm">2 mins away</h5>
          <p className="font-normal text-xs">Affordable, compact rides</p>
        </div>
        <h2 className="text-xl font-medium">₹{props.fare.car}</h2>
      </div>

      <div
        onClick={() => {
          props.setConfirmRideOpen(true);
          props.setVehiclePanelOpen(false);
          props.selectVehicle("motorcycle");
        }}
        className="flex border-2 border-gray-300 active:border-black w-full mb-2 rounded-xl p-3 items-center justify-between"
      >
        <img
          className="h-15"
          src="https://www.uber-assets.com/image/upload/f_auto,q_auto:eco,c_fill,w_956,h_637/v1649231091/assets/2c/7fa194-c954-49b2-9c6d-a3b8601370f5/original/Uber_Moto_Orange_312x208_pixels_Mobile.png"
          alt=""
        />
        <div className="ml-3 w-1/2">
          <h4 className="font-bold text-base">
            Moto{" "}
            <span>
              <i className="ri-user-3-fill"></i>1
            </span>
          </h4>
          <h5 className="font-medium text-sm">3 mins away</h5>
          <p className="font-normal text-xs">Affordable, MotorCycle rides</p>
        </div>
        <h2 className="text-xl font-medium">₹{props.fare.motorcycle}</h2>
      </div>
      <div
        onClick={() => {
          props.setConfirmRideOpen(true);
          props.setVehiclePanelOpen(false);
          props.selectVehicle("Auto");
        }}
        className="flex border-2 border-gray-300 active:border-black w-full mb-2 rounded-xl p-3 items-center justify-between"
      >
        <img
          className="h-15"
          src="https://clipart-library.com/2023/Uber_Auto_312x208_pixels_Mobile.png"
          alt=""
        />
        <div className="ml-3 w-1/2">
          <h4 className="font-bold text-base">
            Auto{" "}
            <span>
              <i className="ri-user-3-fill"></i>1
            </span>
          </h4>
          <h5 className="font-medium text-sm">5 mins away</h5>
          <p className="font-normal text-xs">Affordable, Auto rides</p>
        </div>
        <h2 className="text-xl font-medium">₹{props.fare.auto}</h2>
      </div>
    </div>
  );
};

export default VehiclePanel;
