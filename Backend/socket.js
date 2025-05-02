const { Server } = require("socket.io");
const userModel = require("./Models/usermodel");
const captainModel = require("./Models/captainModel");
const connectToDb = require("./db/db");

let io;

async function initializeSocket(server) {
  
  await connectToDb();
  io = new Server(server, {
    cors: {
      origin: "*", 
      methods: ["GET", "POST"],
    },
  });

  io.on("connection", (socket) => {
    console.log(` Socket connected: ${socket.id}`);

    socket.on("update-location-captains", async (data) => {
      const { userId, location } = data;

      if (!location || !location.lat || !location.lng) {
        return socket.emit("error", "Location is required");
      }

      try {
        await captainModel.findByIdAndUpdate(
          userId,
          {
            location: {
              type: "Point",
              coordinates: [location.lng, location.lat], 
            },
            lastUpdated: new Date(), 
          },
          { new: true }
        );
        console.log(" Captain's location updated.");
      } catch (error) {
        console.error(" Error updating location:", error);
        socket.emit("error", "Failed to update location");
      }
    });

    socket.on("disconnect", () => {
      console.log(` Socket disconnected: ${socket.id}`);
    });
  });
}

function sendMessageToSocketID(socketID, event, message) {
  if (io) {
    io.to(socketID).emit(event, message);
  } else {
    console.error("Socket.io is not initialized. Call initializeSocket first.");
  }
}

module.exports = { initializeSocket, sendMessageToSocketID };
