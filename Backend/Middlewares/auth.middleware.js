const userModel = require("../Models/usermodel");
const captainModel = require("../Models/captainModel");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const blacklistTokenModel = require("../Models/blacklistToken.model");

module.exports.authUser = async (req, res, next) => {
  const token = req.cookies.token || req.headers.authorization?.split(" ")[1]; // Extract token

  if (!token) {
    return res.status(401).json({ message: "Unauthorized: No token" }); // If no token, return error
  }

  // Check if the token is blacklisted
  const isBlackListed = await blacklistTokenModel.findOne({ token: token });
  if (isBlackListed) {
    return res
      .status(401)
      .json({ message: "Unauthorized: Token is blacklisted" });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET); // Verify the token
    console.log("Decoded Token:", decoded); // Check decoded token

    const user = await userModel.findById(decoded._id);
    // Find user by _id

    console.log("User found:", user);

    if (!user) {
      return res.status(401).json({ message: "Unauthorized: User not found" });
    }

    req.user = user; // Set the user object in the request
    return next(); // Proceed to the next middleware/route handler
  } catch (error) {
    console.error("Token verification failed:", error); // Log any errors
    return res.status(401).json({ message: "Invalid Token" }); // Invalid token error
  }
};

module.exports.authCaptain = async (req, res, next) => {
  const token = req.cookies.token || req.headers.authorization?.split(" ")[1];
  console.log(token);
  if (!token) {
    return res.status(401).json({ message: "Unauthorized" });
  }
  const isBlackListed = await blacklistTokenModel.findOne({ token: token });
  console.log(isBlackListed);
  if (isBlackListed) {
    return res.status(401).json({ message: "Unauthorized" });
  }
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const captain = await captainModel.findById(decoded._id);
    req.captain = captain;
    return next();
  } catch (error) {
    return res.status(401).json({ message: "Invalid Token" });
  }
};
