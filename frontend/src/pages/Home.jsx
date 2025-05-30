import React, { useState, useRef, useContext, useEffect } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import axios from "axios";
import "remixicon/fonts/remixicon.css";
import LocationSearchPanel from "../Components/LocationSearchPanel";
import VehiclePanel from "../Components/VehiclePanel";
import ConfirmRide from "../Components/ConfirmRide";
import LookingForDriver from "../Components/LookingForDriver";
import WaitingForDriver from "../Components/WaitingForDriver";
import { SocketDataContext } from "../Context/SocketDataContext";
import { useNavigate } from "react-router-dom";

import { UserDataContext } from "../Context/UserDatacontext";
import LiveTracking from "../Components/LiveTracking";
const Home = () => {
  const [pickupLocation, setPickupLocation] = useState("");
  const [dropLocation, setDropLocation] = useState("");
  const [panelOpen, setPanelOpen] = useState(false);
  const panelRef = useRef(null);
  const panelCloseRef = useRef(null);

  const [vehiclePanelOpen, setVehiclePanelOpen] = useState(false);
  const [ConfirmRideOpen, setConfirmRideOpen] = useState(false);
  const [lookingForDriverOpen, setLookingForDriverOpen] = useState(false);
  const [WaitingForDriverOpen, setWaitingForDriverOpen] = useState(false);
  const [PickupSuggestions, setPickupSuggestions] = useState([]);
  const [destinationSuggestions, setDestinationSuggestions] = useState([]);
  const [activeField, setActiveField] = useState(null);
  const [fare, setfare] = useState({});
  const [vehicleType, setVehicleType] = useState("null");
  const { socket } = useContext(SocketDataContext);
  const { user } = useContext(UserDataContext);
  const [ride, setRide] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    socket.emit("join", { userType: "user", userId: user._id });
  });
  socket.on("ride-confirmed", (data) => {
    console.log("Ride confirmed:", data);

    setLookingForDriverOpen(false);
    setWaitingForDriverOpen(true);
    setRide(data);
  });
  socket.on("ride-started", (ride) => {
    console.log("Ride started:", ride);
    setWaitingForDriverOpen(false);
    navigate("/riding", { state: { ride } });
  });
  const handlePickupChange = async (e) => {
    setPickupLocation(e.target.value);
    try {
      const response = await axios.get(
        `${import.meta.env.VITE_BASE_URL}/maps/get-suggestions`,
        {
          params: { input: e.target.value },
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      console.log("Pickup Suggestions: ", response.data);
      setPickupSuggestions(response.data);
    } catch (err) {
      // handle error
      console.error("Pickup API Error: ", err);
    }
  };

  const handleDestinationChange = async (e) => {
    setDropLocation(e.target.value);
    try {
      const response = await axios.get(
        `${import.meta.env.VITE_BASE_URL}/maps/get-suggestions`,
        {
          params: { input: e.target.value },
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      console.log("Pickup Suggestions: ", response.data);
      setDestinationSuggestions(response.data);
    } catch (err) {
      // handle error
      console.error("Pickup API Error: ", err);
    }
  };

  const submitHandler = (e) => {
    e.preventDefault();
  };
  useGSAP(() => {
    if (panelOpen) {
      gsap.to(panelRef.current, {
        height: "70%",
        padding: "25",
      });
      gsap.to(panelCloseRef.current, {
        opacity: 1,
      });
    } else {
      gsap.to(panelRef.current, {
        height: 0,
        padding: 0,
      });
      gsap.to(panelCloseRef.current, {
        opacity: 0,
      });
    }
  }, [panelOpen]);

  async function findTrip() {
    setVehiclePanelOpen(true);
    setPanelOpen(false);
    try {
      const response = await axios.get(
        `${import.meta.env.VITE_BASE_URL}/rides/get-fare`,
        {
          params: {
            pickup: pickupLocation,
            destination: dropLocation,
            vehicleType: vehicleType,
          },
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );

      console.log("Fare Data: ", response.data);
      setfare(response.data);
    } catch (error) {
      console.error("Error fetching fare data", error);
    }
  }

  async function createRide() {
    try {
      const token = localStorage.getItem("token");

      if (!token) {
        console.error("No token found");
        return;
      }

      const response = await axios.post(
        `${import.meta.env.VITE_BASE_URL}/rides/create-ride`,
        {
          pickup: pickupLocation,
          destination: dropLocation,
          vehicleType: vehicleType,
        },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );

      console.log(" Ride Created:", response.data);
    } catch (error) {
      console.error(" Error creating ride:", error);

      if (error.response) {
        console.error(" Backend Error Response:", error.response.data);
      }
    }
  }
  const selectVehicle = (type) => {
    setVehicleType(type);
    console.log(`Vehicle selected: ${type}`);
  };

  return (
    <div className="h-screen relative overflow-hidden">
      <img
        className="w-16 absolute left-5 top-5"
        src="https://cdn-icons-png.flaticon.com/512/89/89131.png"
        alt="Home"
      />
      <div className="h-screen w-screen">
        <LiveTracking />
      </div>
      <div className=" flex flex-col justify-end h-screen absolute top-0  w-full pointer-events-none ">
        <div className="h-[40%] p-5 bg-white relative pointer-events-auto">
          <h5
            ref={panelCloseRef}
            onClick={() => {
              setPanelOpen(false);
            }}
            className="absolute  opacity-0 top-6 right-6 text-2xl"
          >
            <i className="ri-arrow-down-s-line"></i>
          </h5>
          <h4 className="text-2xl font-semibold"> Find a trip</h4>
          <form
            className="relative"
            onSubmit={(e) => {
              submitHandler(e);
            }}
          >
            <div className="line  absolute h-16 w-1 top-[20%] left-6 bg-gray-700 rounded-full"></div>

            <input
              onClick={() => {
                setPanelOpen(true);
                setActiveField("pickup");
              }}
              value={pickupLocation}
              onChange={handlePickupChange}
              className="bg-[#eee] px-12 py-2 text-lg rounded-lg w-full"
              type="text"
              placeholder="Add a pick-up location"
            />

            <input
              onClick={() => {
                setPanelOpen(true);
                setActiveField("destination");
              }}
              value={dropLocation}
              onChange={handleDestinationChange}
              className="bg-[#eee] px-12 py-2 text-lg rounded-lg w-full  mt-3"
              type="text"
              placeholder="Enter your destination"
            />
          </form>
          <button
            onClick={() => {
              findTrip();
            }}
            className=" w-full mt-3 flex justify-center bg-green-700 text-white font-semibold p-3 rounded-lg"
          >
            Find A Trip
          </button>
        </div>
        <div ref={panelRef} className=" bg-white h-0 pointer-events-auto ">
          <LocationSearchPanel
            panelOpen={panelOpen}
            setPanelOpen={setPanelOpen}
            vehiclePanelOpen={vehiclePanelOpen}
            setVehiclePanelOpen={setVehiclePanelOpen}
            activeField={activeField}
            suggestions={
              activeField === "pickup"
                ? PickupSuggestions
                : destinationSuggestions
            }
            setPickupLocation={setPickupLocation}
            setDropLocation={setDropLocation}
            setPickup
          />
        </div>
      </div>

      <VehiclePanel
        vehiclePanelOpen={vehiclePanelOpen}
        setVehiclePanelOpen={setVehiclePanelOpen}
        setConfirmRideOpen={setConfirmRideOpen}
        setfare={setfare}
        fare={fare}
        selectVehicle={selectVehicle}
      />
      {ConfirmRideOpen && (
        <ConfirmRide
          ConfirmRideOpen={ConfirmRideOpen}
          setConfirmRideOpen={setConfirmRideOpen}
          setLookingForDriverOpen={setLookingForDriverOpen}
          setWaitingForDriverOpen={setWaitingForDriverOpen}
          createRide={createRide}
          pickupLocation={pickupLocation}
          dropLocation={dropLocation}
          fare={fare}
          vehicleType={vehicleType}
        />
      )}
      {lookingForDriverOpen && (
        <LookingForDriver
          lookingForDriverOpen={lookingForDriverOpen}
          setLookingForDriverOpen={setLookingForDriverOpen}
          createRide={createRide}
          pickupLocation={pickupLocation}
          dropLocation={dropLocation}
          fare={fare}
          vehicleType={vehicleType}
        />
      )}
      {WaitingForDriverOpen && (
        <WaitingForDriver
          WaitingForDriverOpen={WaitingForDriverOpen}
          setWaitingForDriverOpen={setWaitingForDriverOpen}
          ride={ride}
        />
      )}
    </div>
  );
};

export default Home;
