const captainModel = require('../Models/captainModel');

module.exports.createCaptain = async ({
    firstname,
    lastname,
    email,
    password,
    color,
    plateNumber,
  
    }) => {
    if (!firstname || !email || !password || !color || !plateNumber) {
        throw new Error("All fields are required");
    }
    const captain = new captainModel({
        fullname: {
            firstname,
            lastname,
        },
        email,
        password,
        vehicle: {
            color,
            plateNumber,
            // vehicleType,
        },
    })
    return captain;
}