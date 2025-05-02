import React from "react";
import { Link } from "react-router-dom";

const Riding = () => {
  return (
    <div className="h-screen ">
        <Link to="/home" className="fixed top-2 right-2 h-10 w-10 bg-white flex items-center justify-center rounded-full">
        <i class=" text-lg  ri-home-5-line"></i>
        </Link>
      <div className="h-1/2">
        <img
          className="h-full w-full object-cover "
          src="https://www.hanbit.co.kr/data/editor/20210429161116_qvzgnfvw.gif"
          alt=""
        />
      </div>
      <div className="h-1/2 p-4">
        <div className="flex items-center  justify-between">
          <img
            className="h-15"
            src="https://www.pngplay.com/wp-content/uploads/8/Uber-PNG-Photos.png"
            alt=""
          />
          <div className="text-right">
            <h2 className="text-lg font-medium">Tarun</h2>
            <h4 className="text-lg font-semibold -mt-1 -mb-1">UP 20 HL 123</h4>
            <p className="text-sm text-gray-600">Maruti Suziki Alto</p>
          </div>
        </div>

        <div className="flex gap-2 justify-between items-center flex-col">
          <div className="w-full  mt-3">
           
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
                <h3 className="text-lg ">190.30</h3>
                <p className="text-base -mt-1 text-gray-800">Cash Cash</p>
              </div>
            </div>
          </div>
        </div>
        <button className=" w-full mt-3 bg-green-700 text-white font-semibold p-2 rounded-lg">Make a Payment</button>
      </div>
    </div>
  );
};

export default Riding;
