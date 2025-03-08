const userModel = require("../Models/usermodel");
const userService = require("../Services/user.service");
const { validationResult } = require("express-validator");
const blackListTokenSchema = require("../Models/blacklistToken.model");


module.exports.registerUser = async (req, res) => {
  console.log("📩 Received Registration Data:", req.body); // Log incoming data

  const error = validationResult(req);
  if (!error.isEmpty()) {
    console.log("❌ Validation Error:", error.array());
    return res.status(400).json({ errors: error.array() });
  }

  try {
    const { fullname, email, password } = req.body;
    console.log("📝 Extracted Data:", { fullname, email, password });

    const hashpassword = await userModel.hashPassword(password);
    console.log("🔑 Hashed Password:", hashpassword);

    const user = await userService.createUser({
      firstname: fullname.firstname,
      lastname: fullname.lastname,
      email: email.toLowerCase(), // Ensure lowercase email
      password: hashpassword,
    });

    console.log("✅ User Saved in Database:", user); // Log user de
    // tails
    const savedUser = await user.save();
    console.log("✅ Confirmed User Saved in MongoDB:", savedUser);
    
    // Check if user exists immediately after saving
    const checkUser = await userModel.findOne({ email });
    console.log("🔍 Checking If User Exists:", checkUser);

    const token = user.generateAuthToken();
    res.status(201).json({ token, user });
  } catch (error) {
    console.error("❌ Error Saving User:", error);
    res.status(500).json({ message: "Server error", error: error.message });
  }
};


module.exports.loginUser = async (req, res) => {
  const error = validationResult(req);
  if (!error.isEmpty()) {
    return res.status(400).json({ errors: error.array() });
  }
  
  
  const { email, password } = req.body;
console.log("Email received from request:", email);
const users = await userModel.find();
console.log("All users in DB:", users.map(user => user.email));




  const user = await userModel.findOne({ email }).select('+password');
console.log("User found:", user);

  
  if (!user) {
    return res.status(401).json({ message: "Invalid Email or Password" });
  }

  const isMatch = await user.comparePassword(password);
  if (!isMatch) {
    return res.status(401).json({ message: "Invalid Email or Password" });
  }
  const token = user.generateAuthToken();
  
  res.cookie('token', token );
  res.status(200).json({ token, user });
};



module.exports.getUserProfile = async (req, res, next) => {
  res.status(200).json(req.user);
};

module.exports.logoutUser = async (req, res, next) => {
  res.clearCookie('token');
  const token = req.cookies.token || req.headers.authorization.split(' ')[1];
  await blackListTokenSchema.create({token});
  res.status(200).json({message: 'Logged out successfully'});
}