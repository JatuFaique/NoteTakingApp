import axios from "axios";
import { createContext, useContext, useState } from "react";
import { useNavigate } from "react-router-dom";

const AuthContext = createContext();

const AuthProvider = ({ children }) => {
  const navigate = useNavigate();

  const [isLogin, setIsLogin] = useState(false);
  const user = localStorage.getItem("user");
  const token = localStorage.getItem("token");

  const handleSingupData = async (email, password, firstName, lastName) => {
    const getValues = { email, password, firstName, lastName };
    try {
      const res = await axios.post("/api/auth/signup", getValues);
      if (res.status == 200 || res.status == 201) {
        setIsLogin(true);
        localStorage.setItem("token", res.data.encodedToken);
        navigate("/login");
      }
    } catch (error) {
      if (error.response.status == 422) {
        alert("Successfully Registered, Please sign in");
      }
    }
  };
  const handleLoginData = async (email, password) => {
    const getLoginValues = { email, password };
    try {
      const res = await axios.post("/api/auth/login", getLoginValues);
      if (res.status == 200 || res.status == 201) {
        setIsLogin(true);

        localStorage.setItem("token", res.data.encodedToken);
        navigate("/");
        localStorage.setItem("user", res.data.foundUser.firstName);
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <AuthContext.Provider
      value={{
        isLogin,
        setIsLogin,
        handleSingupData,
        handleLoginData,
        user,
        token,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
const useAuth = () => useContext(AuthContext);

export { useAuth, AuthProvider };
