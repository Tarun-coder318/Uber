const mongoose = require("mongoose");

async function connectToDb() {
  try {
    await mongoose.connect(process.env.MONGO_URI, {
      serverSelectionTimeoutMS: 30000,
      bufferCommands: false,
    });

    mongoose.connection.once("open", () => {
      console.log("✅ Connected to DB:", mongoose.connection.db.databaseName);
    });
  } catch (err) {
    console.error("Error connecting to DB:", err);
  }
}

module.exports = connectToDb;
