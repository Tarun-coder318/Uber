const userModel = require("../Models/usermodel");

module.exports.createUser = async ({
  firstname,
  lastname,
  email,
  password,
}) => {
  if (!firstname || !email || !password) {
    throw new Error("All fields are required");
  }
  const user = new userModel({
    fullname: {
      firstname,
      lastname,
    },
    email,
    password,
  })
  return user;
}
