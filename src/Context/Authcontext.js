import React, { createContext, useContext, useReducer } from "react";

import authReducer, { initialState } from "../reducers/authReducer";
export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  return (
    <AuthContext.Provider value={useReducer(authReducer, initialState)}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
