
import React, { useEffect } from "react";
import { io } from "socket.io-client";
import { SocketDataContext } from "./SocketDataContext";

const socket = io(import.meta.env.VITE_BASE_URL); // Create once outside

const SocketProvider = ({ children }) => {
  useEffect(() => {
    console.log("🌐 Connecting to socket:", import.meta.env.VITE_BASE_URL);
  
    const onConnect = () => console.log("✅ Socket connected:", socket.id);
    const onDisconnect = () => console.log("❌ Socket disconnected");
  
    socket.on("connect", onConnect); // 🔥 Added
    socket.on("disconnect", onDisconnect); // 🔥 Added
  
    return () => {
      socket.off("connect", onConnect);
      socket.off("disconnect", onDisconnect);
    };
  }, []);
  
 

  return (
    <SocketDataContext.Provider value={{ socket }}>
      {children}
    </SocketDataContext.Provider>
  );
};

export default SocketProvider;
