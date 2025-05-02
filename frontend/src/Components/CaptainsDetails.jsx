import React from "react";
import { useContext } from "react";
import { CaptainDataContext } from "../Context/CaptainDataContext";

const CaptainsDetails = () => {
  const { captain } = useContext(CaptainDataContext);
  return (
    <div>
      <div className="h-2/5 p-6">
        <div className="flex items-center  justify-between">
          <div className="flex items-center  justify-start gap-2">
            <img
              className="h-10 w-10 rounded-full object-cover  "
              src="https://cdn.quotesgram.com/img/85/87/1731438144-BcogIEmIEAA3O5m.jpg"
              alt=""
            />
            <h4 className="text-lg font-medium">
              {captain.fullname.firstname + " " + captain.fullname.lastname}
            </h4>
          </div>
          <div>
            <h4 className="text-xl font-semibold">500.9RS</h4>
            <p className="text-sm text-gray-600">Earned</p>
          </div>
        </div>
        <div className="flex p-3 mt-12 bg-gray-100 rounded-xl gap-5 justify-between items-start ">
          <div className="text-center">
            <i className=" text-3xl  mb-2 font-thin ri-time-line"></i>
            <h5 className="text-lg font-medium">10.2</h5>
            <p className="text-sm text-gray-500">Hours Online</p>
          </div>
          <div className="text-center">
            <i className=" text-3xl   mb-2  font-thin ri-speed-up-fill"></i>
            <h5 className="text-lg font-medium">10.2</h5>
            <p className="text-sm text-gray-500">Hours Online</p>
          </div>
          <div className="text-center">
            <i className=" text-3xl  mb-2  font-thin ri-book-read-fill"></i>
            <h5 className="text-lg font-medium">10.2</h5>
            <p className="text-sm text-gray-500">Hours Online</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CaptainsDetails;
