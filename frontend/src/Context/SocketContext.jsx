
import React, { useEffect } from "react";
import { io } from "socket.io-client";
import { SocketDataContext } from "./SocketDataContext";

const socket = io(import.meta.env.VITE_BASE_URL); // Create once outside

const SocketProvider = ({ children }) => {
  useEffect(() => {
    console.log("🌐 Connecting to socket:", import.meta.env.VITE_BASE_URL);
    const onConnect = () => console.log("✅ Socket connected:", socket.id);
    const onDisconnect = () => console.log("❌ Socket disconnected");

 

    // ⚠️ DO NOT disconnect during fast refresh
    return () => {
      socket.off("connect", onConnect);
      socket.off("disconnect", onDisconnect);
      // Do not call socket.disconnect() here unless you are unmounting forever
    };
  }, []);

 

  return (
    <SocketDataContext.Provider value={{ socket }}>
      {children}
    </SocketDataContext.Provider>
  );
};

export default SocketProvider;
