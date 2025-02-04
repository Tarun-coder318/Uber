const userModel = require("../Models/usermodel");

module.exports.createUser = async ({
  firstname,
  lastname,
  email,
  passward,
}) => {
  if (!firstname || !email || !passward) {
    throw new Error("All fields are required");
  }
  const user = new userModel({
    fullname: {
      firstname,
      lastname,
    },
    email,
    passward,
  })
  return user;
}
