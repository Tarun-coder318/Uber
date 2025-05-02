const rideService = require("../Services/ride.services");
const { validationResult } = require("express-validator");
const mapsService = require("../Services/maps.services");
const { sendMessageToSocketID } = require("../socket");

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

    const captainsPromise = mapsService.getCaptainsInRadius(
      pickupCoordinates.lat,
      pickupCoordinates.lng,
      2
    );

    // Handle notifications asynchronously after getting captains
    const captainsInRadius = await captainsPromise;
    console.log("Captains in Radius:", captainsInRadius);

    if (captainsInRadius.length === 0) {
      console.log(" No captains found in the radius.");
    }

    // Sending ride data to captains in parallel
    const captainNotifications = captainsInRadius.map((captain) =>
      sendMessageToSocketID(captain.socketId, {
        event: "new-ride",
        data: ride,
      })
    );

    // Wait for all notifications to be sent
    await Promise.all(captainNotifications);
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
