const axios = require("axios");
const captainModel = require("../Models/captainModel");

module.exports.getAddressCoordinates = async (address) => {
  const apikey = process.env.GOOGLE_MAP_API_KEY;
  const url = `https://maps.googleapis.com/maps/api/geocode/json?address=${encodeURIComponent(
    address
  )}&key=${apikey}`;

  try {
    const response = await axios.get(url);

    console.log("Geocoding API URL:", url);
    console.log("Google API Response:", response.data); // 💡 This logs the full response from Google

    if (response.data.status === "OK") {
      const location = response.data.results[0].geometry.location;
      return {
        lat: location.lat,
        lng: location.lng,
      };
    } else {
      throw new Error(
        `Unable to get coordinates: ${response.data.status} - ${response.data.error_message}`
      );
    }
  } catch (error) {
    throw new Error(
      "Error fetching coordinates from Google Maps API: " + error.message
    );
  }
};
module.exports.getDistance = async (origin, destination) => {
  if (!origin || !destination) {
    throw new Error("Origin and destination are required");
  }
  const apikey = process.env.GOOGLE_MAP_API_KEY;
  const url = `https://maps.googleapis.com/maps/api/distancematrix/json?origins=${encodeURIComponent(
    origin
  )}&destinations=${encodeURIComponent(destination)}&key=${apikey}`;
  try {
    const response = await axios.get(url);
    console.log("Distance API URL:", url);
    console.log("Google API Response:", response.data); // 💡

    if (response.data.status === "OK") {
      const distanceInfo = response.data.rows[0].elements[0];
      if (distanceInfo.status === "OK") {
        return {
          distance: distanceInfo.distance.text,
          duration: distanceInfo.duration.text,
        };
      } else {
        throw new Error(`Unable to get distance: ${distanceInfo.status}`);
      }
    }
  } catch (error) {
    throw new Error(
      "Error fetching distance from Google Maps API: " + error.message
    );
  }
};
module.exports.getSuggestions = async (input) => {
  if (!input) {
    throw new Error("Input is required for suggestions");
  }
  const apikey = process.env.GOOGLE_MAP_API_KEY;
  const url = `https://maps.googleapis.com/maps/api/place/autocomplete/json?input=${encodeURIComponent(
    input
  )}&key=${apikey}`;

  try {
    const response = await axios.get(url);
    console.log("Suggestions API URL:", url);
    console.log("Google API Response:", response.data); // 💡

    if (response.data.status === "OK") {
      return response.data.predictions.map(
        (prediction) => prediction.description
      );
    } else {
      throw new Error(
        `Unable to get suggestions: ${response.data.status} - ${response.data.error_message}`
      );
    }
  } catch (error) {
    throw new Error(
      "Error fetching suggestions from Google Maps API: " + error.message
    );
  }
};

module.exports.getCaptainsInRadius = async (lat, lng, radius) => {
  try {
    // Ensure the input latitude and longitude are valid numbers
    if (isNaN(lat) || isNaN(lng)) {
      console.log(" Invalid latitude or longitude");
      return [];
    }

    // Log the incoming data
    console.log(" Searching for captains with coordinates:", { lat, lng });
    console.log(" Search radius (in km):", radius);

    // Ensure the radius is in a valid range (e.g., greater than 0)
    if (radius <= 0) {
      console.log("Invalid radius");
      return [];
    }

    // Perform the geospatial query
    const captains = await captainModel.find({
      location: {
        $near: {
          $geometry: {
            type: "Point",
            coordinates: [lng, lat],
          },
          $maxDistance: radius * 5000, // radius in meters
        },
      },
    });

    // Log the found captains (or an empty array if none found)
    if (captains.length > 0) {
      console.log(" Found Captains in Radius:", captains);
    } else {
      console.log(" No captains found within the radius.");
    }

    return captains;
  } catch (err) {
    console.error(" Error in getCaptainsInRadius:", err.message);
    return [];
  }
};
