const captainModel = require("../Models/captainModel");
const captainService = require("../Services/captain.service");
const { validationResult } = require("express-validator");

const blacklistTokenModel = require("../Models/blacklistToken.model");

module.exports.registerCaptain = async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    const { fullname, email, password, vehicle } = req.body;
    const iscaptainAlreadyExist = await captainModel.findOne({ email });
    if (iscaptainAlreadyExist) {
      return res.status(400).json({ message: "Captain already exists" });
    }

    const hashPassword = await captainModel.hashPassword(password);
    const captain = await captainService.createCaptain({
      firstname: fullname.firstname,
      lastname: fullname.lastname,
      email,
      password: hashPassword,
      color: vehicle.color,
      plateNumber: vehicle.plateNumber,
    });
    const token = captain.generateAuthToken();
    await captain.save();
    res.status(201).json({ token, captain });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports.loginCaptain = async (req, res) => {
  console.log("🚀 Login Request Received:", req.body);

  try {
    const { email, password } = req.body;
    if (!email || !password) {
      console.log(" Missing email or password");
      return res
        .status(400)
        .json({ message: "Email and password are required" });
    }

    const captain = await captainModel.findOne({ email }).select("+password");
    if (!captain) {
      console.log(" Captain not found:", email);
      return res.status(400).json({ message: "Captain not found" });
    }

    const isPasswordMatch = await captain.comparePassword(
      password,
      captain.password
    );
    if (!isPasswordMatch) {
      console.log(" Invalid password for:", email);
      return res.status(400).json({ message: "Invalid password" });
    }

    console.log("✅ Login successful for:", email);

    const token = captain.generateAuthToken();
    console.log("✅ Token Generated:", token);

    res.cookie("token", token, { httpOnly: true });
    console.log("✅ Cookie Set Successfully");

    res.status(200).json({ token, captain });
    console.log("✅ Response Sent Successfully");
  } catch (error) {
    console.error("🔥 Server Error:", error);
    res
      .status(500)
      .json({ message: "Internal Server Error", error: error.message });
  }
};

module.exports.getCaptainProfile = async (req, res) => {
  try {
    res.status(200).json(req.captain);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports.logoutCaptain = async (req, res) => {
  try {
    const { token } = req.cookies || req.headers.authorization?.split(" ")[1];
    await blacklistTokenModel.create({ token });
    res.clearCookie("token");
    res.status(200).json({ message: "Logout successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
