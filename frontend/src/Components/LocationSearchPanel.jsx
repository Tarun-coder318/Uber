// import React from 'react'

// const LocationSearchPanel = (props) => {
//     // sample array for location
//     const handleSuggestionClick = (suggestion) => {
//       if (props.activeField === 'pickup') {
//           props.setPickupLocation(suggestion)
//       } else if (props.activeField === 'destination') {
//           props.setDropLocation(suggestion)
//       }
//       // setVehiclePanel(true)
//       // setPanelOpen(false)
//   }
//   return (
//     <div>

//       {props.suggestion.map((element, index) => (
//   <div
//   key={index}
//   onClick={() => handleSuggestionClick(element)}
//   //  onClick={() =>{ props.setVehiclePanelOpen(true)
//   //   props.setPanelOpen(false)
//   // }}

//  className='flex gap-4 border-2 p-3 border-gray-50 active:border-black rounded-xl items-center my-2 justify-start'>
//     <h2 className='bg-[#eeee] flex items-center justify-center w-12 h-10 rounded-full'>
//       <i className="ri-map-pin-fill"></i>
//     </h2>
//     <h4 className='font-medium'>{element}</h4>
//   </div>
// ))}

//          </div>
//   )
// }

// export default LocationSearchPanel

import React from "react";

const LocationSearchPanel = (props) => {
  const handleSuggestionClick = (suggestion) => {
    if (props.activeField === "pickup") {
      props.setPickupLocation(suggestion);
    } else if (props.activeField === "destination") {
      props.setDropLocation(suggestion);
    }
  };

  return (
    <div>
      {props.suggestions && props.suggestions.length > 0 ? (
        props.suggestions.map((element, index) => (
          <div
            key={index}
            onClick={() => handleSuggestionClick(element)}
            className="flex gap-4 border-2 p-3 border-gray-50 active:border-black rounded-xl items-center my-2 justify-start"
          >
            <h2 className="bg-[#eeee] flex items-center justify-center w-12 h-10 rounded-full">
              <i className="ri-map-pin-fill"></i>
            </h2>
            <h4 className="font-medium">{element.description || element}</h4>
          </div>
        ))
      ) : (
        <p className="text-gray-500 px-4 py-2">No suggestions found.</p>
      )}
    </div>
  );
};

export default LocationSearchPanel;
