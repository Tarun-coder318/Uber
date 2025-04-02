import React from 'react'


const LocationSearchPanel = (props) => {
    // sample array for location
   console.log(props);
    const locations = [
        "1A ,Rana House,Haldaur , near Ram Mandir,Bijnor",
        "10D ,Chauhan House,Haldaur , near Ram Mandir,Bijnor",
        "3C ,Singh House,Haldaur , near Ram Mandir,Bijnor",
        "4B.Kapoor's cafe ,Haldaur , near Ram Mandir,Bijnor",
    ]
  return (
    <div>

      {/* this is a sample location search panel
      {locations.map((element, index) => {
        return(
            <div onClick={() => props.setVehiclePanel(true)} // Instead of calling props.vehiclePanel()

             className='flex gap-4 border-2 p-3 border-gray-50 active:border-black  rounded-xl items-center  my-2 justify-start'>
            <h2  className='bg-[#eeee] flex items-center justify-center w-12 h-10 rounded-full'><i className="ri-map-pin-fill"></i> </h2>
            <h4 className='font-medium'>{element}</h4>
          </div>
        )
      })} */}
      {locations.map((element, index) => (
  <div 
  key={index} 
   onClick={() =>{ props.setVehiclePanelOpen(true)
    props.setPanelOpen(false) 
  }}

 className='flex gap-4 border-2 p-3 border-gray-50 active:border-black rounded-xl items-center my-2 justify-start'>
    <h2 className='bg-[#eeee] flex items-center justify-center w-12 h-10 rounded-full'>
      <i className="ri-map-pin-fill"></i>
    </h2>
    <h4 className='font-medium'>{element}</h4>
  </div>
))}

         </div>
  )
}


export default LocationSearchPanel
