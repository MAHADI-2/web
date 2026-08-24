import { createContext, useContext, useState } from "react";
import api from "../api/axios.js";
const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [userInfo, setUserInfo] = useState(() => {
    const stored = localStorage.getItem("userInfo");
    return stored ? JSON.parse(stored) : null;
  });

  const sentOtp = async (name, email, password) => {
    const { data } = await api.post("/sendOtp", { name, email, password });
    return data;
  };

  const register = async (email, otp) => {
    const { data } = await api.post("/register", { email, otp });

    if (data.status === "success") {
      localStorage.setItem("userInfo", JSON.stringify(data.data));
      setUserInfo(data.data);
    }
    return data;
  };

  const login = async (email, password) => {
    const { data } = await api.post("/login", { email, password });

    if (data.status === "success") {
      localStorage.setItem("userInfo", JSON.stringify(data.data));
      setUserInfo(data.data);
    }
    return data;
  };

  const logout = () => {
    localStorage.removeItem("userInfo");
    setUserInfo(null);
  };

  return (
    <AuthContext.Provider
      value={{
        userInfo,
        sentOtp,
        register,
        login,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);