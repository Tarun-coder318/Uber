const mapsService = require("../Services/maps.services");
const { validationResult } = require("express-validator");

module.exports.getCoordinates = async (req, res) => {
  const error = validationResult(req);
  if (!error.isEmpty()) {
    return res.status(400).json({ errors: error.array() });
  }

  const { address } = req.query;
  try {
    const coordinates = await mapsService.getAddressCoordinates(address);
    res.status(200).json(coordinates);
  } catch (error) {
    console.error("Error fetching coordinates:", error.message);
    res
      .status(500)
      .json({ message: "Error fetching coordinates", error: error.message });
  }
};

module.exports.getDistance = async (req, res) => {
  try {
    const error = validationResult(req);
    if (!error.isEmpty()) {
      return res.status(400).json({ errors: error.array() });
    }
    const { origin, destination } = req.query;
    const distance = await mapsService.getDistance(origin, destination);
    res.status(200).json(distance);
  } catch (error) {
    console.error("Error fetching distance:", error.message);
    res
      .status(500)
      .json({ message: "Error fetching distance", error: error.message });
  }
};

module.exports.getSuggestions = async (req, res, next) => {
  try {
    const error = validationResult(req);
    if (!error.isEmpty()) {
      return res.status(400).json({ errors: error.array() });
    }
    const { input } = req.query;
    const suggestions = await mapsService.getSuggestions(input);
    res.status(200).json(suggestions);
  } catch (error) {
    console.error("Error fetching suggestions:", error.message);
    res
      .status(500)
      .json({ message: "Error fetching suggestions", error: error.message });
  }
};
