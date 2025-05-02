const express = require("express");
const router = express.Router();
const authMiddleware = require("../Middlewares/auth.middleware");
const ridecontroller = require("../Controllers/ride.controllers");
const { body,query } = require("express-validator");

router.post(
  "/create-ride",
  authMiddleware.authUser,
  body("pickup")
    .isString()
    .isLength({ min: 3 })
    .withMessage("Pickup location must be a string with at least 3 characters"),
  body("destination")
    .isString()
    .isLength({ min: 3 })
    .withMessage("Destination must be a string with at least 3 characters"),
  body("vehicleType")
    .isString()
    .isLength({ min: 3 })
    .withMessage("Vehicle type must be a string with at least 3 characters"),
    
  ridecontroller.createRide
);
 module.exports = router;
 router.get("/get-fare", authMiddleware.authUser,
  query("pickup").isString().isLength({ min: 3 }).withMessage("Pickup location must be a string with at least 3 characters"),
  query("destination").isString().isLength({ min: 3 }).withMessage("Destination must be a string with at least 3 characters"),
  
  ridecontroller.getFare);
