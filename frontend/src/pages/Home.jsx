import React, { useState, useRef } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import 'remixicon/fonts/remixicon.css'
import LocationSearchPanel from "../Components/LocationSearchPanel";
import VehiclePanel from "../Components/VehiclePanel";
import ConfirmRide from "../Components/ConfirmRide";
import LookingForDriver from "../Components/LookingForDriver";
import WaitingForDriver from "../Components/WaitingForDriver";

const Home = () => {
  const [pickupLocation, setPickupLocation] = useState("");
  const [dropLocation, setDropLocation] = useState("");
const [panelOpen, setPanelOpen] = useState(false);
const panelRef = useRef(null);
const panelCloseRef = useRef(null);

// const vehiclePanelRef = useRef(null);
const [vehiclePanelOpen, setVehiclePanelOpen] = useState(false);
const[ConfirmRideOpen, setConfirmRideOpen] = useState(false)
const [lookingForDriverOpen, setLookingForDriverOpen] = useState(false)
const [WaitingForDriverOpen, setWaitingForDriverOpen] = useState(false)


  const submitHandler = (e) => {
    e.preventDefault();
  };
  useGSAP(() => {
    if(panelOpen) {
      gsap.to(panelRef.current, {
        height: "70%",
        padding: "25",
      });
      gsap.to(panelCloseRef.current, {
        opacity: 1
      })
    } else {
      gsap.to(panelRef.current, {
        height: 0,
        padding: 0
      });
      gsap.to(panelCloseRef.current, {
        opacity: 0
      })
    }
  }, [panelOpen]);
   

  return (
    <div className="h-screen relative overflow-hidden">
      <img
        className="w-16 absolute left-5 top-5"
        src="https://logospng.org/download/uber/logo-uber-4096.png"
        alt="Home"
      />
      <div className="h-screen w-screen">
        {/* image for temproary home page */}
        <img
          className="h-full w-full object-cover "
          src="https://www.hanbit.co.kr/data/editor/20210429161116_qvzgnfvw.gif"
          alt=""
        />
      </div>
      <div className=" flex flex-col justify-end h-screen absolute top-0  w-full ">
        <div className="h-[30%] p-5 bg-white relative">
          <h5  ref ={panelCloseRef}  onClick={()=>{
            setPanelOpen(false)
          }} className="absolute  opacity-0 top-6 right-6 text-2xl"><i className="ri-arrow-down-s-line"></i></h5>
          <h4 className="text-2xl font-semibold"> Find a trip</h4>
          <form className="relative"
            onSubmit={(e) => {
              submitHandler(e);
            }}
          >
            <div className="line  absolute h-16 w-1 top-[32%] left-6 bg-gray-700 rounded-full"></div>
            <input
            onClick={() => setPanelOpen(true)}
            value={pickupLocation}
            onChange={(e) => setPickupLocation(e.target.value)}
            
           
              className="bg-[#eeee] px-12 py-2  text-base rounded-lg w-full mt-5"
              type="text"
              placeholder="Enter Pickup Location"
            />
            <input
            onClick={() => setPanelOpen(true)}
             value={dropLocation}
             onChange={(e) => setDropLocation(e.target.value)}
              className="bg-[#eeee] px-12 py-2  text-base rounded-lg w-full mt-3"
              type="text"
              placeholder="Enter Drop Location"
            />
          </form>
        </div>
        <div ref={panelRef} className=" bg-white h-0 ">
          <LocationSearchPanel panelOpen={panelOpen} setPanelOpen={setPanelOpen} vehiclePanelOpen={vehiclePanelOpen} setVehiclePanelOpen={setVehiclePanelOpen} /> 
        </div>
      </div>
      {/* ✅ Fix: Ensure `VehiclePanel` is rendered */}
      <VehiclePanel 
        vehiclePanelOpen={vehiclePanelOpen} 
        setVehiclePanelOpen={setVehiclePanelOpen} 
        setConfirmRideOpen={setConfirmRideOpen}
      />
     {ConfirmRideOpen && (
  <ConfirmRide 
    ConfirmRideOpen={ConfirmRideOpen} 
    setConfirmRideOpen={setConfirmRideOpen}
    setLookingForDriverOpen={setLookingForDriverOpen}
  />
)}
{lookingForDriverOpen && (
  <LookingForDriver
    lookingForDriverOpen={lookingForDriverOpen}
    setLookingForDriverOpen={setLookingForDriverOpen}
  />
)}
{WaitingForDriverOpen && (
  <WaitingForDriver
    WaitingForDriverOpen={WaitingForDriverOpen}
    setWaitingForDriverOpen={setWaitingForDriverOpen}
  />
)}
    </div>
  );
};

export default Home;
 
// import React, { useState, useRef } from "react";
// import { useGSAP } from "@gsap/react";
// import gsap from "gsap";
// import 'remixicon/fonts/remixicon.css'
// import LocationSearchPanel from "../Components/LocationSearchPanel";
// import VehiclePanel from "../Components/VehiclePanel";

// const Home = () => {
//   const [pickupLocation, setPickupLocation] = useState("");
//   const [dropLocation, setDropLocation] = useState("");
//   const [panelOpen, setPanelOpen] = useState(false);
//   const panelRef = useRef(null);
//   const panelCloseRef = useRef(null);
//   const [vehiclePanelOpen, setVehiclePanelOpen] = useState(false); // ✅ Correctly updating state

//   const submitHandler = (e) => {
//     e.preventDefault();
//   };

//   useGSAP(() => {
//     if (panelOpen) {
//       gsap.to(panelRef.current, { height: "70%", padding: "25" });
//       gsap.to(panelCloseRef.current, { opacity: 1 });
//     } else {
//       gsap.to(panelRef.current, { height: 0, padding: 0 });
//       gsap.to(panelCloseRef.current, { opacity: 0 });
//     }
//   }, [panelOpen]);

//   return (
//     <div className="h-screen relative overflow-hidden">
//       <img
//         className="w-16 absolute left-5 top-5"
//         src="https://logospng.org/download/uber/logo-uber-4096.png"
//         alt="Home"
//       />
//       <div className="h-screen w-screen">
//         <img
//           className="h-full w-full object-cover"
//           src="https://www.hanbit.co.kr/data/editor/20210429161116_qvzgnfvw.gif"
//           alt=""
//         />
//       </div>

//       {/* Search Panel */}
//       <div className="flex flex-col justify-end h-screen absolute top-0 w-full">
//         <div className="h-[30%] p-5 bg-white relative">
//           <h5 
//             ref={panelCloseRef}  
//             onClick={() => setPanelOpen(false)}
//             className="absolute opacity-0 top-6 right-6 text-2xl"
//           >
//             <i className="ri-arrow-down-s-line"></i>
//           </h5>
//           <h4 className="text-2xl font-semibold">Find a trip</h4>
//           <form className="relative" onSubmit={submitHandler}>
//             <div className="line absolute h-16 w-1 top-[32%] left-6 bg-gray-700 rounded-full"></div>
//             <input
//               onClick={() => setPanelOpen(true)}
//               value={pickupLocation}
//               onChange={(e) => setPickupLocation(e.target.value)}
//               className="bg-[#eeee] px-12 py-2 text-base rounded-lg w-full mt-5"
//               type="text"
//               placeholder="Enter Pickup Location"
//             />
//             <input
//               onClick={() => setPanelOpen(true)}
//               value={dropLocation}
//               onChange={(e) => setDropLocation(e.target.value)}
//               className="bg-[#eeee] px-12 py-2 text-base rounded-lg w-full mt-3"
//               type="text"
//               placeholder="Enter Drop Location"
//             />
//           </form>
//         </div>

//         <div ref={panelRef} className="bg-white h-0">
//           <LocationSearchPanel 
//             panelOpen={panelOpen} 
//             setPanelOpen={setPanelOpen} 
//             vehiclePanelOpen={vehiclePanelOpen} 
//             setVehiclePanelOpen={setVehiclePanelOpen} 
//           />
//         </div>
//       </div>

//       {/* ✅ Fix: Ensure `VehiclePanel` is rendered */}
//       <VehiclePanel 
//         vehiclePanelOpen={vehiclePanelOpen} 
//         setVehiclePanelOpen={setVehiclePanelOpen} 
//       />
//     </div>
//   );
// };

// export default Home;
