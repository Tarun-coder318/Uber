
import React, { useState } from "react";
import { UserDataContext } from "./UserDatacontext";

const Usercontext = ({ children }) => {
  const [user, setUser] = useState({
    email: "",
    password: "",
    fullname: {
      firstname: "",  // ✅ Lowercase key to match backend
      lastname: "",   // ✅ Lowercase key to match backend
    },
  });

  return (
    <UserDataContext.Provider value={{ user, setUser }}>
      {children}
    </UserDataContext.Provider>
  );
};

export default Usercontext;
