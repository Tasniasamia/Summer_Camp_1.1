"use client";
import React, { createContext, useContext, useEffect, useState } from "react";
const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const [otpPayload, setOtpPayload] = useState({});





  return (
    <UserContext.Provider
      value={{
        otpPayload,
        setOtpPayload,
    
      }}
    >
      {children}
    </UserContext.Provider>
  );
};

export const useUser = () => useContext(UserContext);
