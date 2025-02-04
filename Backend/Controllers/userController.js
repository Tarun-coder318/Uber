const userModel = require('../Models/usermodel');
const userService = require('../Services/user.service');
const {validationResult} = require('express-validator');

module.exports.registerUser = async (req , res) => {
 const error = validationResult(req);
 if(!error.isEmpty()){
    return res.status(400).json({errors:error.array()});
 }

 const {fullname, email, passward} = req.body;
 const hashpassward = await userModel.hashPassward(passward);
const user = await userService.createUser({
    firstname: fullname.firstname,
    lastname: fullname.lastname,
    email,
    passward: hashpassward
});
const token = user.generateAuthToken();
res.status(201).json({token,user});
}