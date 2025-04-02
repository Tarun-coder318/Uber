import React, { useRef } from 'react'
import { useGSAP } from '@gsap/react'
import gsap from 'gsap'

const WaitingForDriver = (props) => {
    const  WaitingForDriverRef = useRef(null);


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
    className="fixed w-full  bottom-0 px-2 py-2 pt-10 bg-white "
  >
    <h4
     
    >
      <i className="text-gray-400 text-3xl ri-arrow-down-wide-line"></i>
    </h4>
    <div>
    <img
        className="h-15"
        src="https://www.pngplay.com/wp-content/uploads/8/Uber-PNG-Photos.png"
        alt=""
      />
      <div className='flex items-center  justify-between'>
        <h2 className='text-lg font-medium'>Tarun</h2>
        <h4 className='text-lg font-semibold -mt-1 -mb-1'>UP 20 HL 123</h4>
        <p className='text-sm text-gray-600'>Maruti Suziki Alto</p>
      </div>
    </div>
    <h3 className="text-2xl font-medium">Looking For Driver</h3>





    <div className="flex gap-2 justify-between items-center flex-col">
      
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
            17th Cross Rd, 5th Block, Koramangala
            , Bengaluru, Karnataka 560034
            </p>
          </div>
         
        </div>
        <div className="flex  items-center p-3  gap-5">
        <i class=" text-lg ri-money-rupee-circle-line"></i>
          <div>
            <h3 className="text-lg ">190.30</h3>
            <p className="text-base -mt-1 text-gray-800">
              Cash Cash
            </p>
          </div>
        </div>
      </div>
     
    </div>
  </div>
  )
}

export default WaitingForDriver
