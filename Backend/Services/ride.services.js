const rideModel = require("../Models/ride.model");
const mapsService = require("./maps.services");
const crypto = require("crypto");

function getOtp(num) {
  function generateOTP(num) {
    const otp = crypto
      .randomInt(Math.pow(10, num - 1), Math.pow(10, num))
      .toString();
    return otp;
  }
  return generateOTP(num);
}
async function getFare(pickup, destination) {
  if (!pickup || !destination) {
    throw new Error("Pickup and destination are required to calculate fare");
  }

  const distanceData = await mapsService.getDistance(pickup, destination);

  const distanceInKm = parseInt(distanceData.distance.replace(" km", ""));
  const distanceInMeters = distanceInKm * 1000; // Convert km to meters

  const durationParts = distanceData.duration.split(" ");
  const hours = parseInt(durationParts[0].replace("hours", "").trim()) || 0;
  const minutes = parseInt(durationParts[1].replace("mins", "").trim()) || 0;

  // Convert duration to seconds
  const durationInSeconds = hours * 3600 + minutes * 60;

  // Logging the converted distance and duration
  console.log("Distance in meters:", distanceInMeters);
  console.log("Duration in seconds:", durationInSeconds);

  const baseFare = {
    auto: 30,
    car: 50,
    motorcycle: 8,
  };
  const farePerKm = {
    auto: 10,
    car: 15,
    motorcycle: 5,
  };
  const perMinuteRate = {
    auto: 2,
    car: 3,
    motorcycle: 1,
  };

  const fare = {
    auto:
      baseFare.auto +
      farePerKm.auto * distanceInKm +
      perMinuteRate.auto * durationInSeconds,
    car:
      baseFare.car +
      farePerKm.car * distanceInKm +
      perMinuteRate.car * durationInSeconds,
    motorcycle:
      baseFare.motorcycle +
      farePerKm.motorcycle * distanceInKm +
      perMinuteRate.motorcycle * durationInSeconds,
  };

  return fare;
}
module.exports.getFare = getFare;

module.exports.createRide = async ({
  user,
  pickup,
  destination,
  vehicleType,
}) => {
  if (!user || !pickup || !destination || !vehicleType) {
    throw new Error("All fields are required");
  }

  const fare = await getFare(pickup, destination);
  console.log("💰 Calculated fare:", fare);

  const ride = new rideModel({
    user,
    pickup,
    destination,
    vehicleType,
    otp: getOtp(4),
    fare: fare[vehicleType],
  });

  return ride.save(); // Don’t forget to save it!
};
