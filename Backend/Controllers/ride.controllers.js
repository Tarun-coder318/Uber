const rideService = require("../Services/ride.services");
const { validationResult } = require("express-validator");
const mapsService = require("../Services/maps.services");
const { sendMessageToSocketID } = require("../socket");
const rideModel = require("../Models/ride.model");

module.exports.createRide = async (req, res) => {
  const error = validationResult(req);
  if (!error.isEmpty()) {
    return res.status(400).json({ errors: error.array() });
  }

  if (!req.user || !req.user._id) {
    return res
      .status(401)
      .json({ message: "Unauthorized: user not authenticated" });
  }

  const { pickup, destination, vehicleType } = req.body;

  console.log(" Data being passed to rideService.createRide:", {
    user: req.user._id,
    pickup,
    destination,
    vehicleType,
  });

  try {
    console.log(" req.user._id:", req.user._id); // Debug line

    // Creating the ride
    const ride = await rideService.createRide({
      user: req.user._id,
      pickup,
      destination,
      vehicleType,
    });

    // Send response right after creating the ride to avoid blocking
    res.status(201).json(ride);

    // Fetch pickup coordinates and captains in parallel (non-blocking)
    const pickupCoordinates = await mapsService.getAddressCoordinates(pickup);
    console.log("🔥 Pickup Coordinates:", pickupCoordinates);

   
    const captainsInRadius = await mapsService.getCaptainsInRadius(
      pickupCoordinates.lat,
      pickupCoordinates.lng,
      2
    );
    console.log("Captains in Radius:", captainsInRadius);

    ride.otp =""
const RideWithUser = await rideModel.findOne({ _id: ride._id }).populate("user")
    
console.log("Ride:", ride);
console.log("RideWithUser:", RideWithUser);
console.log("Captains in radius:", captainsInRadius);

      captainsInRadius.map( captain => {
        console.log(captain,ride),
        sendMessageToSocketID(captain.socketId, {
          event: "new-ride",
          data:  RideWithUser,
        });
      });
        
      
  } catch (error) {
    console.error(" Error creating ride:", error.message);
    res
      .status(500)
      .json({ message: "Error creating ride", error: error.message });
  }
};

module.exports.getFare = async (req, res) => {
  const error = validationResult(req);
  if (!error.isEmpty()) {
    return res.status(400).json({ errors: error.array() });
  }

  const { pickup, destination } = req.query;

  try {
    const fare = await rideService.getFare(pickup, destination);
    res.status(200).json(fare);
  } catch (error) {
    console.error(" Error calculating fare:", error.message);
    res
      .status(500)
      .json({ message: "Error calculating fare", error: error.message });
  }
};
module.exports.confirmRide = async (req, res) => {
  const error = validationResult(req);
  if (!error.isEmpty()) {
    return res.status(400).json({ errors: error.array() });
  }

  const { rideId } = req.body;

  try {
    const ride = await rideService.confirmRide({rideId, captainId: req.captain});
    if (!ride ||!ride.user._id) {
      return res.status(404).json({ message: "Ride not found" });
    }
    sendMessageToSocketID(ride.user.socketId, {
      event: "ride-confirmed",
      data: ride,
    });
    res.status(200).json(ride);

  } catch (error) {
   console.log(error);
   return res.status(500).json({ message: "Error confirming ride" });
  }
}

module.exports.startRide = async (req, res) => {
  const error = validationResult(req);
  if (!error.isEmpty()) {
    return res.status(400).json({ errors: error.array() });
  }

  const { rideId, otp } = req.query;

  try {
    const ride = await rideService.startRide({ rideId, otp , captainId: req});
    if (!ride) {
      return res.status(404).json({ message: "Ride not found" });
    }
    res.status(200).json(ride);
  } catch (error) {
    console.error(" Error starting ride:", error.message);
    res.status(500).json({ message: "Error starting ride", error: error.message });
  }
};

module.exports.endRide = async (req, res) => {
  const error = validationResult(req);
  if (!error.isEmpty()) {
    return res.status(400).json({ errors: error.array() });
  }

  const { rideId } = req.body;

  try {
    const ride = await rideService.endRide({ rideId, captain: req.captain });

    if (!ride) {
      return res.status(404).json({ message: "Ride not found" });
    }
    sendMessageToSocketID(ride.user.socketId, {
      event: "ride-ended",
      data: ride,
    });
    res.status(200).json(ride);
  } catch (error) {
    console.error(" Error ending ride:", error.message);
    res.status(500).json({ message: "Error ending ride", error: error.message });
  }
};
