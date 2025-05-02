import React, { useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const UserLogout = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("token");

    const logout = async () => {
      try {
        await axios.get(`${import.meta.env.VITE_BASE_URL}/users/logout`, {
          headers: { Authorization: `Bearer ${token}` },
        });
      } catch (error) {
        console.error("Logout failed:", error);
      } finally {
        localStorage.removeItem("token");
        navigate("/login");
      }
    };

    logout();
  }, [navigate]);

  return <div>Logging out...</div>;
};

export default UserLogout;
