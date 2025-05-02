import React, { useState } from "react";
import { Link } from "react-router-dom";
import FinishRide from "../Components/FinishRide";

const CaptainRiding = () => {
  const [finishRideOpen, setfinsihRideOpen] = useState(false);
  return (
    <div className="h-screen relative">
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
      <div className="h-4/5">
        <img
          className="h-full w-full object-cover "
          src="https://www.hanbit.co.kr/data/editor/20210429161116_qvzgnfvw.gif"
          alt=""
        />
      </div>
      <div className="h-1/5  p-6 flex items-center justify-between relative bg-yellow-400">
        <h5
          className="p-1 text-center w-[90%] absolute top-0"
          onClick={() => {
            setfinsihRideOpen(true);
          }}
        >
          <i className="ri-arrow-up-wide-line text-3xl text-gray-400"></i>
        </h5>
        <h4 className="text-xl font-semibold">4KM away</h4>
        <button className="bg-green-600 text-white font-semibold p-3 px-10 rounded-lg">
          Complete Ride
        </button>
      </div>
      <div>
        <FinishRide
          finishRideOpen={finishRideOpen}
          setfinsihRideOpen={setfinsihRideOpen}
        />
      </div>
    </div>
  );
};

export default CaptainRiding;
